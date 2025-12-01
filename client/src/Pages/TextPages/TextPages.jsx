import { useParams } from 'react-router';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';
import { pages } from './textForPages';
import style from './TextPages.module.css';

export const TextPages = (props) => {
  const pageName = useParams().pageName;

  return (
    <div className={style.TextPages}>
      <Breadcrumbs pageName={pages[pageName].title} />
      <h1>{pages[pageName].title}</h1>
      <p style={{ whiteSpace: 'break-spaces' }}>{pages[pageName].body}</p>
    </div>
  );
};
