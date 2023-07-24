import Calc from '@/components/Calc'
import { Container, Title, ActionIcon } from '@mantine/core'
import { HeartPlus } from 'tabler-icons-react';


export default function Home() {

  return (
    <>
      <Container mb={20}>
      <div style={{display:'flex', alignItems:'center', justifyContent:"center"}}>
      <ActionIcon size="sm" mr={10}>
            <HeartPlus size="2rem" strokeWidth={2}  color={'#bf4040'} />
        </ActionIcon>
        <Title order={1} mt={20} mb={20} size={20}> Heart Disease Insurance Premium Calculator</Title>
        </div>
            <Calc />
      </Container>
    </>
  )
}
