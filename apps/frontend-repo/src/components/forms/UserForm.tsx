"use client"
import {User} from "@ebuddy/types"
import {Box, TextField} from "@mui/material"
import React, {useState} from "react"

interface UserFormProps {
  user: User
  onChange: (user: User) => void
}

const UserForm: React.FC<UserFormProps> = ({user, onChange}) => {
  const [value, setValue] = useState<User>(user)
  const handleOnChange = (value: string | number, key: keyof User) => {
    const tempValue = {
      ...user,
      [key]: value,
    }
    setValue(tempValue)
    onChange(tempValue)
  }
  return (
    <Box display="flex" flexDirection="column" gap={2} minWidth={400} my={2}>
      <TextField
        label="name"
        value={value.name}
        onChange={(e) => handleOnChange(e.target.value, "name")}
      />
      <TextField
        label="email"
        value={value.email}
        onChange={(e) => handleOnChange(e.target.value, "email")}
      />
      <TextField
        label="totalAverageWeightRatings"
        value={value.totalAverageWeightRatings}
        type="number"
        onChange={(e) =>
          handleOnChange(Number(e.target.value??0), "totalAverageWeightRatings")
        }
      />
      <TextField
        label="numberOfRents"
        value={value.numberOfRents}
        type="number"
        onChange={(e) => handleOnChange(Number(e.target.value??0), "numberOfRents")}
      />
    </Box>
  )
}

export default UserForm
