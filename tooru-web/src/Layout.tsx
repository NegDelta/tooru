import React, { useEffect, useState } from 'react';
import { Outlet, useLoaderData, useOutletContext, Link } from 'react-router-dom';
import { tooruwebDebug } from './utils';
import './layout.css';

const debug = tooruwebDebug('layout');

export interface MenuEntry {
  path: string;
  external?: boolean;
  text: string;
}

interface MenuProps {
  entries: MenuEntry[];
}

const Menu = ({ entries }: MenuProps) => (
  <ul>
    {entries.map(({ path, external, text }) => (
      <li>
        <Link to={path} reloadDocument={external}>
          {text}
        </Link>
      </li>
    ))}
  </ul>
);

const mainMenuEntries = [
  { text: 'all pages', path: '/' },
  { text: 'new page', path: '/pages/new/' },
  { text: 'upload', path: '/upload/' },
  { text: 'admin', path: '/admin/' }
];

export interface LayoutHeaderProps {
  title: string;
  submenuEntries: MenuEntry[];
}

const defaultProps: LayoutHeaderProps = {
  title: '',
  submenuEntries: []
};

export type SetHeaderProps = React.Dispatch<React.SetStateAction<LayoutHeaderProps>>;

export const Layout = () => {
  const [headerProps, setHeaderProps] = useState(defaultProps);
  const { title, submenuEntries } = headerProps;

  useEffect(() => {
    document.title = `tooru${title ? ' / ' : ''}${title}`;
  }, []);

  return (
    <div id='wrapper'>
      <div id='header'>
        <Link to='/'>
          <img src='/toorubox.png' height='50' />
        </Link>
        <div id='pagetitle'>
          <div id='pageicon'></div>
          {title}
          <div className='menu' id='pagetm'>
            <Menu entries={submenuEntries} />
          </div>
        </div>
        <div className='menu' id='mainm'>
          <Menu entries={mainMenuEntries} />
        </div>
      </div>
      <div className='layout-content'>{<Outlet context={setHeaderProps} />}</div>
    </div>
  );
};

interface ViewProps extends LayoutHeaderProps {
  content: JSX.Element;
}

export const View =
  <T,>(loaderToContent: (loaderData: T) => ViewProps) =>
  () => {
    const setHeaderProps: SetHeaderProps = useOutletContext();
    debug(`got outlet context: ${setHeaderProps}`);
    const contentContext = useLoaderData() as T;
    debug(`got content context: ${contentContext}`);
    const { title, submenuEntries, content } = loaderToContent(contentContext);
    setHeaderProps({ title, submenuEntries });
    return content;
  };
