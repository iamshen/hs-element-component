import StringColumn from './components/string-column.vue'
import TimeStampColumn from './components/timestamp-column.vue'
import ImageColumn from './components/image-column.vue'
import ActionColumn from './components/action-column.vue'
import LinkColumn from './components/link-column.vue'
import TagColumn from './components/tag-column.vue'
import DyncColumn from './components/dynamic-column.vue'
import SwitchColumn from './components/switch-column.vue'
import TextColumn from './components/text-column.vue'
import { ColumnPropsType } from './types'

const TablePropsTypeMap = Object.freeze({
  [ColumnPropsType.STRING]: StringColumn,
  [ColumnPropsType.TIMESTAMP]: TimeStampColumn,
  [ColumnPropsType.IMAGE]: ImageColumn,
  [ColumnPropsType.LINK]: LinkColumn,
  [ColumnPropsType.TAG]: TagColumn,
  [ColumnPropsType.TEXT]: TextColumn,
  [ColumnPropsType.DYNAMIC]: DyncColumn,
  [ColumnPropsType.ACTION]: ActionColumn,
  [ColumnPropsType.SWITCH]: SwitchColumn,
})

function compNameRef(tablePropsType: ColumnPropsType | keyof typeof ColumnPropsType = ColumnPropsType.STRING) {
  if (tablePropsType === null)
    tablePropsType = ColumnPropsType.STRING
  if (typeof tablePropsType === 'string') {
    const enumKey = ColumnPropsType[tablePropsType as keyof typeof ColumnPropsType]
    return (TablePropsTypeMap as Record<ColumnPropsType, any>)[enumKey]
  }
  return (TablePropsTypeMap as Record<ColumnPropsType, any>)[tablePropsType]
}

export { compNameRef }
