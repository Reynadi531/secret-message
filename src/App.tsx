import { FC, useState, useEffect } from 'react'
import {
  Container,
  Text,
  useColorModeValue,
  Divider,
  Stack,
  Center,
  Link
} from '@chakra-ui/react'
import Navbar from './components/Navbar'
import SubmitForm from './components/SubmitForm'
import Card from './components/Card'
import Fetcher from './libs/fetchData'

const App: FC = () => {
  const [data, setData] = useState<any[]>()
  const bgText = useColorModeValue('gray.50', 'gray.700')
  useEffect(() => {
    refreshData()
  }, [])

  const refreshData = () => {
    Fetcher().then((x: any) => setData(x))
  }

  return (
    <>
      <Container maxW="container.lg" my="4">
        <Navbar />
        <Text
          textAlign="center"
          backgroundColor={bgText}
          py="8"
          rounded="xl"
          w="full"
          fontSize="md"
          fontWeight="normal"
          letterSpacing="0.5px"
          fontStyle="italic"
        >
          Tell something you always want to say
        </Text>

        <SubmitForm refresher={refreshData} />
        <Divider orientation="horizontal" w="full" my="8" />

        <Stack spacing="6" direction="column-reverse">
          {data ? (
            data.map(x => (
              <Card
                date={new Date(x.created_at).toLocaleString()}
                message={x.message}
                bgColor={bgText}
              />
            ))
          ) : (
            <Text>Loading</Text>
          )}
        </Stack>
        <Center my="4">
          <Text textAlign="center" fontSize="xs">
            Made with ❤️ by Rey.
            <br />
            @2021 Rey. Source code{' '}
            <Link
              color="blue.300"
              href="https://github.com/Reynadi531/secret-message"
            >
              here
            </Link>
          </Text>
        </Center>
      </Container>
    </>
  )
}

export default App
