import React from 'react'

export const getDataValue = (field?: any) => {
	return {
		stringified: field?.value ? field?.value || '' : field?.values.join(', '),
	}
}

interface IProps {
	field?: any
}

const FieldValue: React.FC<IProps> = ({ field }) => {
	return <>{getDataValue(field).stringified}</>
}

export default FieldValue
