"use client"
import PageContainer from "@/components/shared/PageContainer"
import DataTable, {Row} from "@/components/shared/DataTable"
import {userColumns} from "@/const/table"
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useInsertUserMutation,
  useUpdateUserMutation,
} from "@/store/api/user"
import FormDialog from "@/components/shared/FormDialog"
import UserForm from "@/components/forms/UserForm"
import {useSelector} from "react-redux"
import {RootState} from "@/store/store"
import {useAppDispatch} from "@/store/hooks"
import {User} from "@ebuddy/types"
import {resetUser, setPagination, setUser} from "@/store/userSlice"
import {useState} from "react"
import ConfirmDialog from "@/components/shared/ConfirmDialog"

export default function UserPage() {
  const {user, pagination} = useSelector((state: RootState) => state.user)

  const {
    data: response,
    isLoading,
    refetch: refetchUser,
  } = useGetUsersQuery({
    page: pagination.page,
    limit: pagination.limit,
  })

  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const [updateUser, {isLoading: isLoadingUpdate}] = useUpdateUserMutation()
  const [insertUser, {isLoading: isLoadingInsert}] = useInsertUserMutation()
  const [deleteUser, {isLoading: isLoadingDelete}] = useDeleteUserMutation()

  const dispatch = useAppDispatch()
  const handleOnChange = (user: User) => {
    dispatch(setUser(user))
  }

  const handleOnSubmitCreateUser = async () => {
    if (user.id) {
      await updateUser({id: user.id, data: user})
    } else {
      await insertUser(user)
    }
    refetchUser()
    setOpen(false)
  }

  const handleOnClickEdit = (row: Row) => {
    console.log(row)
    dispatch(setUser(row))
    setOpen(true)
  }

  const handleClickAdd = () => {
    dispatch(resetUser())
    setOpen(true)
  }

  const handleConfirmDeleteUser = async () => {
    if (user.id) {
      await deleteUser(user.id)
      dispatch(resetUser())
      setOpenDelete(false)
      await refetchUser()
    }
  }

  const handleClickDelete = (row: Row) => {
    dispatch(setUser(row))
    setOpenDelete(true)
  }

  const handlePaginationChange = (value: number, key: string) => {
    dispatch(
      setPagination({
        ...pagination,
        [key]: value,
      }),
    )
  }

  return (
    <PageContainer
      title="Users"
      addButtonText="Add User"
      onClickAdd={handleClickAdd}
    >
      <ConfirmDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        onConfirm={handleConfirmDeleteUser}
        loading={isLoadingDelete}
      />
      <FormDialog
        buttonCancelText="Cancel"
        buttonSubmitText="Save"
        onClose={() => setOpen(false)}
        open={open}
        title={user.id ? "Edit User" : "Add User"}
        onSubmit={handleOnSubmitCreateUser}
        loading={isLoadingUpdate || isLoadingInsert}
      >
        <UserForm onChange={handleOnChange} user={user} />
      </FormDialog>
      <DataTable
        columns={userColumns}
        rows={response?.data ?? []}
        page={pagination.page ?? 1}
        rowsPerPage={pagination.limit ?? 10}
        totalRows={pagination.totalItem ?? 0}
        loading={isLoading}
        onDelete={handleClickDelete}
        onEdit={handleOnClickEdit}
        onPageChange={(page) => handlePaginationChange(page, "page")}
        onRowPerPageChange={(rowsPerPage) =>
          handlePaginationChange(rowsPerPage, "limit")
        }
      />
    </PageContainer>
  )
}
