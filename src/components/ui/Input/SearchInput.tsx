import { Search } from 'lucide-react'
import styles from './search-input.module.css'

interface SearchInputProps {
  placeholder?: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ placeholder = 'Buscar', onChange }: SearchInputProps) => {
  return (
    <div className={styles.input_container}> 
      <input
        type="text"
        onChange={(e) => onChange(e.target.value)}
        className={styles.custom_input}
        placeholder={placeholder}
      />
      <div className={styles.input_icon_container}>
        <Search size={18} strokeWidth={1.5} color='#414146' />
      </div>
    </div>
  )
}