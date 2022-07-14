import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css';

export default function Loader() {
  return (
    <div className={s.loader}>
      <ThreeDots color="#00BFFF" height={80} width={80} ariaLabel="loading" />
    </div>
  );
}