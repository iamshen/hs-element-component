import StringColumn from './components/string-column.vue'
import TimeStampColumn from './components/timestamp-column.vue'
import ImageColumn from './components/image-column.vue'
import ActionColumn from './components/action-column.vue'
import LinkColumn from './components/link-column.vue'
import TagColumn from './components/tag-column.vue'
import DyncColumn from './components/dynamic-column.vue'
import SwitchColumn from './components/switch-column.vue'
import TextColumn from './components/text-column.vue'
import { ColumnType } from './types'

const TablePropsTypeMap = Object.freeze({
  [ColumnType.STRING]: StringColumn,
  [ColumnType.TIMESTAMP]: TimeStampColumn,
  [ColumnType.IMAGE]: ImageColumn,
  [ColumnType.LINK]: LinkColumn,
  [ColumnType.TAG]: TagColumn,
  [ColumnType.TEXT]: TextColumn,
  [ColumnType.DYNAMIC]: DyncColumn,
  [ColumnType.ACTION]: ActionColumn,
  [ColumnType.SWITCH]: SwitchColumn,
})

function compNameRef(tablePropsType: ColumnType | keyof typeof ColumnType = ColumnType.STRING) {
  if (tablePropsType === null)
    tablePropsType = ColumnType.STRING
  if (typeof tablePropsType === 'string') {
    const enumKey = ColumnType[tablePropsType as keyof typeof ColumnType]
    return (TablePropsTypeMap as Record<ColumnType, any>)[enumKey]
  }
  return (TablePropsTypeMap as Record<ColumnType, any>)[tablePropsType]
}

export { compNameRef }
