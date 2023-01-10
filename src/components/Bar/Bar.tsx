import styles from './styles.module.css'

interface BarProps {
  label: string;
  value: number;
  maxValue: number;
}

export const Bar: React.FC<BarProps> = ({ label, value, maxValue }) => {
  return (
    <div className={styles.main}>
      <div className={styles.label}>{label}</div>
      <div className={styles.max}>
        <div className={styles.value} style={{ width: `${(value / maxValue) * 100}%` }}></div>
      </div>
    </div>
  )
}
