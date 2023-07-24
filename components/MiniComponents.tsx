import {  Text, Modal, SegmentedControl, Table } from '@mantine/core';


export function Seg({title, value, setValue, weight, data=null, ...textprop}:any){

    return(
        <div>
            <Text {...textprop} mt="md" fz="sm" align='center'>{title}</Text>
            <SegmentedControl orientation='vertical' size='sm' fullWidth data={data ? data:[ {label:'Yes', value:weight}, {label:'No', value:'0'} ]} onChange={setValue} value={value} />
        </div>
    )
}

export function Breakdown({opened, close, result}:any){

    return(
        <Modal opened={opened} onClose={close} title="Premium BreakDown" centered styles={{title:{fontSize:"1.4rem", fontWeight:"bold", fontFamily:"Verdana"}}}>
                <Table striped highlightOnHover>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>At Age</th>
                            <th>Premium</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((elem:any)=>(
                            <tr key={elem.year}>
                                <td>{elem.year}</td>
                                <td>{elem.age}</td>
                                <td><strong>${elem.premium.toFixed(2)}</strong></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal>
    )
}