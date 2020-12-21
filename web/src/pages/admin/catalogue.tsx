import { Header } from '../../components/sections/Header'
import {
  useDisclosure,
} from "@chakra-ui/react"

const Profile = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // ! GET USERS DATA
  // const [{ data }] = usePharmsQuery({});

  return (
    <>
      <Header onOpen={onOpen} />
    </>
  )

}

export default Profile;


