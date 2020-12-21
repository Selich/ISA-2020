import { Header } from '../../components/sections/Header'
import {
  useDisclosure,
} from "@chakra-ui/react"

export const Profile = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // ! GET USERS DATA
  // const [{ data }] = usePharmsQuey({});

  return (
    <>
      <Header onOpen={onOpen} />
    </>
  )

}
