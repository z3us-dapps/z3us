import React from 'react'

export const getDataValue = (field?: any) =>
	field?.value !== undefined ? field?.value : field?.fields?.map(getDataValue).join(', ') || ''

interface IProps {
	field?: any
}

const FieldValue: React.FC<IProps> = ({ field }) => <>{getDataValue(field)}</>

export default FieldValue
