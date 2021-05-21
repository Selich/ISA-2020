import React, {useState, useEffect} from 'react'
import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,

} from "@chakra-ui/react";
//@ts-ignore
export const safeLoading = (query, retBody) => {
  const [{ fetching, error, data }] = query

  if (error) alert(error);
	if (fetching) { return <p> loading </p>; }
	else if (!data) { return <p> no items </p>; }
	else return retBody(data)

}

export const MyNumberInput = ({defaultValue, min, max, setter}) => {
	return (
		<NumberInput 
		onChange={(val) => setter(val)}
		defaultValue={defaultValue} 
		min={min} 
		max={max}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>

	)

}
export const MyDateInput = ({setter}) => {
	const date = new Date()
	const [day, setDay] = useState(date.getDate() + '')
	const [month, setMonth] = useState(date.getMonth() + 1 + '')
	const [year, setYear] = useState(date.getFullYear()+ '')
	useEffect(() => {
		setter({day, month, year})

	}, [day,month,year])
	return (
		<>
		<MyNumberInput setter={setDay}   defaultValue={date.getDate()} min={1} max={31}/>
		<MyNumberInput setter={setMonth} defaultValue={date.getMonth() + 1} min={1} max={12}/>
		<MyNumberInput setter={setYear}  defaultValue={date.getFullYear()} min={date.getFullYear()} max={2050}/>
	</>

	)

}
export const MyTimeInput = ({setter}) => {
	const date = new Date()
	const [hours, setHours] = useState(date.getDate() + '')
	const [minutes, setMinutes] = useState(date.getMonth() + 1 + '')
	useEffect(() => {
		setter({hours, minutes})

	}, [hours,minutes])
	return (
		<>
		<MyNumberInput setter={setHours}   defaultValue={date.getHours()} min={0} max={23}/>
		<MyNumberInput setter={setMinutes}   defaultValue={date.getMinutes()} min={0} max={59}/>
	</>

	)

}
