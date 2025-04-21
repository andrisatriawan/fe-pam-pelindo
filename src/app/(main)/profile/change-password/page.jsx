// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'
import ChangePassword from '@/views/profile/ChangePassword'

export const metadata = {
  title: 'Ubah Kata Sandi',
  description: 'Ubah Kata Sandi'
}

const ChangePasswordPage = async () => {
  // Vars
  const mode = await getServerMode()

  return <ChangePassword mode={mode} />
}

export default ChangePasswordPage
