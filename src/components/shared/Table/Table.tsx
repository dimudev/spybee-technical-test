import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  OnChangeFn
} from '@tanstack/react-table'
import { useProjectStore } from '@/store/useProjectStore'
import styles from './table.module.css'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sorting: SortingState; 
  onSortingChange: OnChangeFn<SortingState>; 
  onRowClick?: (id: string) => void;
}

export function Table<TData, TValue> ({
  columns,
  data,
  sorting,
  onSortingChange,
  onRowClick
}: TableProps<TData, TValue>) {
  
  const {  selectedProjectId } = useProjectStore()
  

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { 
      sorting,
      columnVisibility: {
        rfi: false,
        tasks: false,
        'incidents-sort': false
      }
    },
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  return (
    <div className={styles.table_containter}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={styles.th} style={{ width: header.getSize() }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const project = row.original as any 
            const isSelected = selectedProjectId === project._id

            return (
              <tr 
                key={row.id} 
                className={`${styles.tr_body} ${isSelected ? styles.row_selected : ''}`}
                onClick={() => onRowClick && onRowClick(project._id)}
                style={{ cursor: 'pointer' }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.td} style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
      
      <div className={styles.pagination_controls}>
        <button
          className={styles.page_button}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft size={18} style={{ marginRight: '4px' }} />
    Anterior
        </button>

        <span className={styles.page_info}>
    Página <strong>{table.getState().pagination.pageIndex + 1}</strong> de <strong>{table.getPageCount()}</strong>
        </span>

        <button
          className={styles.page_button}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
    Siguiente
          <ChevronRight size={18} style={{ marginLeft: '4px' }} />
        </button>
      </div>
    </div>
  )
}