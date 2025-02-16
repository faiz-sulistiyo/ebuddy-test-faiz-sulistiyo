"use client"
import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import TablePagination from "@mui/material/TablePagination"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import { Button } from "@mui/material"

export interface Column {
  id: string
  label: string
  align?: "right" | "left" | "center"
  type?: "date" | "text" | "action"
}

export interface Row {
  [key: string]: string | number
}

interface DataTableProps {
  columns: Column[]
  rows: Row[]
  page: number
  rowsPerPage: number
  totalRows: number
  loading?: boolean
  onEdit: (row: Row) => void
  onDelete: (row: Row) => void
  onPageChange: (page: number) => void
  onRowPerPageChange: (rowsPerPage: number) => void
}

export default function DataTable({
  columns,
  rows,
  page,
  rowsPerPage,
  totalRows,
  loading,
  onEdit,
  onDelete,
  onPageChange,
  onRowPerPageChange
}: DataTableProps) {
  return (
    <TableContainer component={Paper}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <CircularProgress />
        </Box>
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="custom table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align || "left"}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align || "left"}>
                    {column.type === "date"
                      ? new Date(row[column.id]).toLocaleDateString()
                      : column.type === "action" ? (
                        <>
                          <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={() => onEdit(row)}
                            sx={{ mr: 1 }}
                          >
                            Edit
                          </Button>
                          <Button
                            color="error"
                            variant="contained"
                            size="small"
                            onClick={() => onDelete(row)}
                          >
                            Delete
                          </Button>
                        </>
                      ) : row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <TablePagination
        component="div"
        count={totalRows}
        page={page-1}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, page) => onPageChange(page+1)}
        onRowsPerPageChange={(e) => onRowPerPageChange(parseInt(e.target.value, 10))}
      />
    </TableContainer>
  )
}