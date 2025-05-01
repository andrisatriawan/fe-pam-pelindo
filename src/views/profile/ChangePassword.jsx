'use client'
import React, { use, useEffect, useRef, useState } from 'react'

import {
  Box,
  Button,
  CardContent,
  Stack,
  TextField,
  Typography,
  Card,
  useMediaQuery,
  IconButton,
  Icon,
  Pagination,
  PaginationItem,
  InputAdornment,
  CardHeader
} from '@mui/material'
import { DataGrid, gridPageCountSelector, GridPagination, useGridApiContext, useGridSelector } from '@mui/x-data-grid'
import { useDebouncedCallback, useDebounce } from '@coreui/react-pro'

import { Delete, Edit } from '@mui/icons-material'

import Swal from 'sweetalert2'

import { createUnit, dataUnit, deleteUnit, findUnit, updateUnit } from '@/utils/unit'
import { changePassword } from '@/utils/user'
import CustomTextField from '@/@core/components/mui/TextField'
import { useAuth } from '@/context/AuthContext'

export default function ChangePassword() {
  // Form
  const [formData, setFormData] = useState({
    password: '',
    old_password: '',
    password_confirmation: ''
  })

  const [loading, setLoading] = useState(false)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const { user, setUser } = useAuth()

  const handleCreate = async () => {
    setLoading(true)

    if (!validatePasswords()) {
      setLoading(false)

      return
    }

    try {
      const res = await changePassword(formData)

      if (res.status) {
        await Swal.fire({
          title: 'Berhasil!',
          text: res.message,
          icon: 'success',
          showConfirmButton: false
        })

        setFormData({ password: '', old_password: '', password_confirmation: '' })
      } else {
        await Swal.fire({
          title: 'Gagal!',
          text: res.message,
          icon: 'error'
        })
      }
    } catch (err) {
      Swal.fire({
        title: 'Gagal!',
        text: err.message || 'Terjadi kesalahan',
        icon: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const validatePasswords = () => {
    if (!formData.old_password.trim()) {
      Swal.fire('Peringatan', 'Password Lama tidak boleh kosong!', 'warning')

      return false
    }

    if (formData.password !== formData.password_confirmation) {
      Swal.fire('Peringatan', 'Password Baru dan Konfirmasi Password harus sama!', 'warning')

      return false
    }

    return true
  }

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        {/* Card Form */}
        <Card sx={{ flex: { xs: '1', md: '30%' }, padding: 2 }}>
          <CardHeader title='Ubah Kata Sandi' />

          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              {/* <TextField
                size='small'
                label='NIP'
                fullWidth
                value={formData.nip}
                onChange={e => setFormData({ ...formData, nip: e.target.value })}
                disabled={true}
              />
              <TextField
                size='small'
                label='Nama'
                fullWidth
                value={formData.nama}
                disabled={true}
                onChange={e => setFormData({ ...formData, nama: e.target.value })}
              /> */}
              <CustomTextField
                required
                fullWidth
                label='Password Lama'
                placeholder='············'
                value={formData.old_password}
                onChange={e => setFormData({ ...formData, old_password: e.target.value })}
                id='outlined-adornment-password'
                type={isPasswordShown ? 'text' : 'password'}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                          <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
                disabled={loading}
              />
              <CustomTextField
                required
                fullWidth
                label='Password Baru'
                placeholder='············'
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                id='outlined-adornment-password'
                type={isPasswordShown ? 'text' : 'password'}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                          <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
                disabled={loading}
              />

              <CustomTextField
                required
                fullWidth
                label='Confirmasi Password'
                placeholder='············'
                value={formData.password_confirmation}
                onChange={e => setFormData({ ...formData, password_confirmation: e.target.value })}
                id='outlined-adornment-password'
                type={isPasswordShown ? 'text' : 'password'}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                          <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
                disabled={loading}
              />
              <Stack direction='row' spacing={1}>
                <Button size='small' variant='contained' color='primary' onClick={handleCreate} disabled={loading}>
                  Ubah
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
