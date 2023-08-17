import { Slider,  Select, SimpleGrid, Alert, Button, NumberInput, Paper, Center, Container, Text } from '@mantine/core';
import { Seg, Breakdown } from '@/components/MiniComponents'
import {useState} from 'react';
import { useDisclosure } from '@mantine/hooks';
import { qx } from '@/data/datafile';
import {AlertCircle, Bike, BikeOff, Smoking, SmokingNo} from 'tabler-icons-react';

export default function Calculator() {
    

    const [opened, { open, close }] = useDisclosure(false);
    
    const [plan, setPlan] = useState<number>(100000);
    const [age, setAge] = useState<number | ''>();
    const [gender, setGender] = useState<string>('0.1');
    const [diabetes, setDiabetes] = useState<string>('0');
    const [smoke, setSmoke] = useState<string>('0');
    const [activity, setActivity] = useState<string>('0');
    const [blood, setBlood] = useState<string>('0');
    const [cholestrol, setCholestrol] = useState<string>('0');
    const [sleep, setSleep] = useState<string | null>(null);

    const [result, setResult] = useState<any>([]);
    const [error, setError] = useState<boolean>(false);

    function Calculate(){
        if(!(plan && age && gender && diabetes && smoke && activity && blood && cholestrol && sleep )) return setError(true);
        setError(false);
        const npxValues = (qx as any)[ gender == '0.1' ? 'Male' : 'Female' ].slice(Number(age) - 31).slice(0, 10)
        const factors:string[] = [ gender, sleep, smoke, diabetes, blood, cholestrol, activity ]
        const sum_factors: number = factors.reduce((a: number, b: string) => a + Number(b), 0);

        const PremiumData = npxValues.map((pj: number, index: number) => ({
            year: index + 1,
            "(1/(1+0.06)^year": ((1/(1+0.06)) ** (index+1) ),
            w:sum_factors,
            pj,
            premium: plan * ((1/(1+0.06)) ** (index+1) ) * ( 1 + sum_factors ) * pj * 1.04 * 1.20 * 1.06,
            age: age + index,
        }))
        setResult(PremiumData)
        console.log(PremiumData)
        open();
    }

    return(
        <Container size="sm">
            <Paper>
               {error && <Alert icon={<AlertCircle size="1rem" />} mb="md" title="Error" color='red' withCloseButton onClose={()=>setError(false)}>Please Fill All The Inputs</Alert>}
                
                <Text mt="lg" fz={18}>Select Plan</Text>
                <Slider mb="md" labelAlwaysOn label={val=>`$${val/1000}k`} onChange={setPlan} value={plan} step={10000} min={50000}  max={200000} />
                
                <NumberInput value={age} onChange={setAge} placeholder="Your age" label="Your age" max={50} min={31} description="This Insurance is valid only for age group 31-50" hideControls withAsterisk />
                
                <Select value={sleep} onChange={setSleep} mt={10} label="Sleep Cycle" withAsterisk withinPortal data={[
                    {label:"10pm - 12am", value:"0"},
                    {label:"12am - 2am", value:"0.05"},
                    {label:"After 2am", value:"0.1"},
                ]} />

                <Seg title="Gender" mt="md" value={gender} setValue={setGender} data={[{label:"Male", value:"0.1"}, {label:"Female", value:"0.05"}]} />
                
                <SimpleGrid cols={2} spacing="md">
                    <Seg mt="md" title="Diabetes?" value={diabetes} setValue={setDiabetes} weight="0.25" />
                    <Seg mt="md" title="Cholestrol?" value={cholestrol} setValue={setCholestrol} weight="0.2" />

                    <Seg title="Do you Smoke?" value={smoke} setValue={setSmoke} data={[
                        {label:<Smoking size="1.1rem" />, value:"0.5"}, {label:<SmokingNo size="1.1rem" />, value:"0"}
                    ]} />
                    <Seg title="High BP?" value={blood} setValue={setBlood} weight="0.5" />
                </SimpleGrid>
                    <Seg title="Physcial Activity?" value={activity} setValue={setActivity} data={[
                        {label:<Bike size="1.1rem" />, value:"0"}, {label:<BikeOff size="1.1rem" />, value:"0.05"}
                    ]} />
                <Button fullWidth mt={20} onClick={Calculate}>Calculate</Button>
            </Paper>
            {result.length > 0 && <Breakdown opened={opened} close={close} result={result} /> }
        </Container>
    )
}
