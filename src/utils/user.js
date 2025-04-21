import Cookies from 'js-cookie'

import { refreshToken } from './auth'

const url = process.env.NEXT_PUBLIC_API_BASE_URL

export const dataUsers = async (page, pageSize, searchQuery) => {
  try {
    const token = Cookies.get('token')

    let urlRequest = `${url}v1/user?page=${page}&page_size=${pageSize}`

    if (searchQuery != '') {
      urlRequest += `&keyword=${searchQuery}`
    }

    if (!token) {
      const refreshSuccess = await refreshToken()

      if (refreshSuccess) {
        return dataUsers(page, pageSize, searchQuery)
      } else {
        throw new Error('Session expired, please login again.')
      }
    }

    const response = await fetch(urlRequest, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    })

    if (response.status === 401) {
      const refreshSuccess = await refreshToken()

      if (refreshSuccess) {
        return dataUsers(page, pageSize, searchQuery)
      } else {
        throw new Error('Session expired, please login again.')
      }
    }

    const data = await response.json()

    if (!response.ok) throw new Error(data.message || 'Gagal mengambil data!')

    return {
      status: true,
      data: data.data,
      pagination: data.pagination
    }
  } catch (error) {
    return {
      status: false,
      data: [],
      message: error
    }
  }
}

export const findUser = async id => {
  const token = Cookies.get('token')

  let urlRequest = `${url}v1/user/${id}`

  if (!token) {
    const refreshSuccess = await refreshToken()

    if (refreshSuccess) {
      return findUser(id)
    } else {
      throw new Error('Session expired, please login again.')
    }
  }

  const response = await fetch(urlRequest, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  })

  const data = await response.json()

  return {
    status: true,
    data: data.data
  }
}

export const updateUser = async (id, dataUser) => {
  try {
    const token = Cookies.get('token')

    let urlRequest = `${url}v1/user/${id}`

    if (!token) {
      const refreshSuccess = await refreshToken()

      if (refreshSuccess) {
        return updateUser(id, dataUser)
      } else {
        throw new Error('Session expired, please login again.')
      }
    }

    const response = await fetch(urlRequest, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(dataUser)
    })

    if (response.status === 401) {
      const refreshSuccess = await refreshToken()

      if (refreshSuccess) {
        return updateUser(id, dataUser)
      } else {
        throw new Error('Session expired, please login again.')
      }
    }

    const data = await response.json()

    if (!response.ok) throw new Error(data.message || 'Gagal update data!')

    return {
      status: true,
      message: data.message
    }
  } catch (error) {
    return {
      status: false,
      data: [],
      message: error
    }
  }
}

export const deleteUser = async id => {
  try {
    const token = Cookies.get('token')

    let urlRequest = `${url}v1/user/${id}`

    if (!token) {
      const refreshSuccess = await refreshToken()

      if (refreshSuccess) {
        return deleteUser(id)
      } else {
        throw new Error('Session expired, please login again.')
      }
    }

    const response = await fetch(urlRequest, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    })

    if (response.status === 401) {
      const refreshSuccess = await refreshToken()

      if (refreshSuccess) {
        return deleteUser(id)
      } else {
        throw new Error('Session expired, please login again.')
      }
    }

    const data = await response.json()

    if (!response.ok) throw new Error(data.message || 'Gagal delete data!')

    return {
      status: true,
      message: data.message
    }
  } catch (err) {
    return {
      status: false,
      data: [],
      message: err
    }
  }
}

export const createUser = async dataUser => {
  try {
    const token = Cookies.get('token')

    let urlRequest = `${url}v1/user`

    if (!token) {
      const refreshSuccess = await refreshToken()

      if (refreshSuccess) {
        return createUser(dataUser)
      } else {
        throw new Error('Session expired, please login again.')
      }
    }

    const response = await fetch(urlRequest, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(dataUser)
    })

    if (response.status === 401) {
      const refreshSuccess = await refreshToken()

      if (refreshSuccess) {
        return createUser(dataUser)
      } else {
        throw new Error('Session expired, please login again.')
      }
    }

    const data = await response.json()

    if (!response.ok) throw new Error(data.message || 'Gagal delete data!')

    return {
      status: true,
      message: data.message
    }
  } catch (err) {
    return {
      status: false,
      message: err
    }
  }
}

export const changePassword = async dataUser => {
  try {
    const token = Cookies.get('token')

    let urlRequest = `${url}v1/user/profile/change-password`

    if (!token) {
      const refreshSuccess = await refreshToken()

      if (refreshSuccess) {
        return changePassword(dataUser)
      } else {
        throw new Error('Session expired, please login again.')
      }
    }

    const response = await fetch(urlRequest, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(dataUser)
    })

    if (response.status === 401) {
      const refreshSuccess = await refreshToken()

      if (refreshSuccess) {
        return changePassword(dataUser)
      } else {
        throw new Error('Session expired, please login again.')
      }
    }

    const data = await response.json()

    if (!response.ok) throw new Error(data.message || 'Gagal delete data!')

    return {
      status: true,
      message: data.message
    }
  } catch (err) {
    return {
      status: false,
      message: err
    }
  }
}
