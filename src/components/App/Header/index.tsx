<<<<<<< HEAD:src/components/App/Header/index.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
=======
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import { useWindowScroll, useRafState } from 'react-use';
import PropTypes from 'prop-types';
import { Link, useHistory, useLocation } from 'react-router-dom';
>>>>>>> upstream/master:src/components/App/Header/index.js
import cn from 'classnames';
import ReactGA from 'react-ga4';
import { Wrapper } from 'common/base';
import GjLogo from 'common/icons/GjLogo.svg';
import Glike from 'common/icons/Glike.svg';
import PopoverToggle from 'common/PopoverToggle';
import useShareLink from 'hooks/experiments/useShareLink';
import usePermission from 'hooks/usePermission';
import useMobile from 'hooks/useMobile';
import { useAuthUser, useIsLoggedIn } from 'hooks/auth';
import { useLogin, useLogout } from 'hooks/login';
import { fetchInbox } from 'actions/inbox';

import styles from './Header.module.css';
import inboxIconStyles from './InboxIcon.module.css';
import SiteMenu from './SiteMenu';
import Top from './Top';
import ProgressTop from './Top/ProgressTop';
import Searchbar from './Searchbar';
import { GA_CATEGORY, GA_ACTION } from 'constants/gaConstants';
<<<<<<< HEAD:src/components/App/Header/index.tsx
import emailStatusMap from 'constants/emailStatus';
import HeaderButton from './HeaderButton';
=======
import InboxIcon from './InboxIcon';
import InboxPopoverContainer from './InboxPopoverContainer';
import usePolling from 'hooks/usePolling';
>>>>>>> upstream/master:src/components/App/Header/index.js

const HeaderTop: React.FC = () => {
  const location = useLocation();
  const isLoggedIn = useIsLoggedIn();
  const shareLink = useShareLink();

<<<<<<< HEAD:src/components/App/Header/index.tsx
  if (!isLoggedIn && location.pathname === '/') {
    return null;
  }

  if (isLoggedIn && !isEmailVerified) {
=======
  return useMemo(() => {
    if (!isLoggedIn && location.pathname === '/') {
      return null;
    }

>>>>>>> upstream/master:src/components/App/Header/index.js
    return (
      <Top>
        <EmailVerificationTop
          isSentVerificationEmail={
            emailStatus === emailStatusMap.SENT_VERIFICATION_LINK
          }
        />
      </Top>
    );
<<<<<<< HEAD:src/components/App/Header/index.tsx
  }

  return (
    <Top to={shareLink}>
      <ProgressTop />
    </Top>
  );
};

const Link: React.FC<{
  to: string;
  title?: string;
  className?: string;
  children: JSX.Element | string;
}> = ({ ...props }) => {
  return (
    // @ts-ignore
    <RouterLink {...props}></RouterLink>
  );
};

const Header: React.FC = () => {
=======
  }, [isLoggedIn, location.pathname, shareLink]);
};

const NamePopoverContainer = ({ children }) => {
  const logout = useLogout();

  return (
    <PopoverToggle
      popoverClassName={cn(styles.popover, styles.nameContainer)}
      popoverContent={
        <ul className={styles.popoverItems}>
          <li>
            <Link className={styles.popoverItem} to="/me/subscriptions/current">
              我的方案
            </Link>
          </li>
          <li>
            <Link className={styles.popoverItem} to="/me">
              管理我的資料
            </Link>
          </li>
          <li>
            <button className={styles.popoverItem} onClick={logout}>
              登出
            </button>
          </li>
        </ul>
      }
    >
      {children}
    </PopoverToggle>
  );
};

NamePopoverContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const NameButton = () => {
  const user = useAuthUser();

  return <div className={styles.userNameBtn}>{user && user.name}</div>;
};

const Logo = ({ forceDesktop }) => {
  const isMobile = useMobile();
  const shouldUseMobile = !forceDesktop && isMobile;

  return (
    <Link
      to="/"
      title="GoodJob 職場透明化運動"
      className={shouldUseMobile ? styles.logoSm : styles.logo}
    >
      <img src={shouldUseMobile ? Glike : GjLogo} alt="Goodjob" />
    </Link>
  );
};

Logo.propTypes = {
  forceDesktop: PropTypes.bool,
};

const ResponsiveSearchbar = ({ className, inputRef }) => {
  const isMobile = useMobile();
  return (
    <div
      className={cn(
        styles.searchbarWrapper,
        { [styles.mobile]: isMobile },
        className,
      )}
    >
      <Searchbar
        className={styles.searchbar}
        placeholder="搜全站薪水/面試/評價"
        inputRef={inputRef}
      />
    </div>
  );
};

ResponsiveSearchbar.propTypes = {
  className: PropTypes.string,
  inputRef: PropTypes.any,
};

// For unread count
const useLoadInbox = () => {
  const dispatch = useDispatch();

  const loadInbox = useCallback(() => {
    dispatch(fetchInbox({ start: 0, limit: 10 }));
  }, [dispatch]);

  return loadInbox;
};

const Nav = ({ isNavOpen, isLoggedIn, login, onClickShareData }) => {
  const loadInbox = useLoadInbox();
  usePolling(loadInbox, 60000, { enabled: isLoggedIn });

  return (
    <nav
      className={cn(styles.nav, {
        [styles.isNavOpen]: isNavOpen,
      })}
    >
      <Logo forceDesktop />
      <SiteMenu isLogin={isLoggedIn} />
      <div className={styles.buttonsArea}>
        <Link to="/plans" className={styles.plansLink}>
          解鎖方式
        </Link>
        <Link
          to="/share"
          className={styles.leaveDataBtn}
          onClick={onClickShareData}
        >
          分享經驗
        </Link>
        <div style={{ position: 'relative' }}>
          {!isLoggedIn && (
            <button className={styles.loginBtn} onClick={login}>
              登入
            </button>
          )}
          {isLoggedIn && (
            <div className={styles.loggedInButton}>
              <InboxPopoverContainer>
                <InboxIcon className={inboxIconStyles.topNavIcon} />
              </InboxPopoverContainer>

              <NamePopoverContainer>
                <NameButton />
              </NamePopoverContainer>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isNavOpen: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  onClickShareData: PropTypes.func.isRequired,
};

const useShowsHeader = () => {
  const isMobile = useMobile();
  const { y: scrollY } = useWindowScroll();
  const [showsHeader, setShowsHeader] = useRafState(true);
  const lastScrollY = useRef(
    typeof window !== 'undefined' ? window.scrollY : 0,
  );

  useEffect(() => {
    if (!isMobile) {
      setShowsHeader(true);
      return;
    }

    if (scrollY <= 50 /* nav height */) {
      setShowsHeader(true);
    } else if (scrollY !== lastScrollY.current) {
      setShowsHeader(scrollY < lastScrollY.current);
    }

    lastScrollY.current = scrollY;
  }, [isMobile, scrollY, setShowsHeader]);

  return showsHeader;
};

const Header = ({ searchInputRef }) => {
>>>>>>> upstream/master:src/components/App/Header/index.js
  const history = useHistory();
  const [isNavOpen, setNavOpen] = useState(false);
  const [isLoggedIn, login] = useLogin();
  const [, fetchPermission] = usePermission();

  const showsHeader = useShowsHeader();

  useEffect(() => {
    if (isLoggedIn) {
      fetchPermission();
    }
  }, [isLoggedIn, fetchPermission]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleNav = useCallback(() => setNavOpen(!isNavOpen), [isNavOpen]);

  const closeNav = useCallback(() => setNavOpen(false), []);

  useEffect(() => history.listen(closeNav), [closeNav, history]);

  return (
    <div className={styles.root}>
      <HeaderTop />
      <header
        className={cn(styles.header, {
          [styles.headerHidden]: !showsHeader,
        })}
      >
        <Wrapper size="l" className={styles.inner}>
<<<<<<< HEAD:src/components/App/Header/index.tsx
          <HeaderButton isNavOpen={isNavOpen} toggle={toggleNav} />
          <div className={styles.logo}>
            <Link to="/" title="GoodJob 職場透明化運動">
              <img src={GjLogo} alt="Goodjob" />
            </Link>
          </div>
          <div className={styles.logoSm}>
            <Link to="/" title="GoodJob 職場透明化運動">
              <img src={Glike} alt="Goodjob" />
            </Link>
          </div>
          <div className={styles.searchbarWrapper}>
            <Searchbar
              className={styles.searchbar}
              placeholder="搜全站薪水/面試/評價"
            />
          </div>
          <div className={cn(styles.searchbarWrapper, styles.mobile)}>
            <Searchbar
              className={styles.searchbar}
              placeholder="搜全站薪水/面試/評價"
            />
          </div>
          <nav
            className={cn(styles.nav, {
              [styles.isNavOpen]: isNavOpen,
            })}
          >
            <Link to="/" className={styles.logo} title="GoodJob 職場透明化運動">
              <img src={GjLogo} alt="Goodjob" />
            </Link>
            <SiteMenu isLogin={isLoggedIn} />
            <div className={styles.buttonsArea}>
              <Link to="/plans" className={styles.plansLink}>
                解鎖方式
              </Link>
              <Link
                to="/share"
                className={styles.leaveDataBtn}
                onClick={(): void => {
                  ReactGA.event({
                    category: GA_CATEGORY.HEADER,
                    action: GA_ACTION.CLICK_SHARE_DATA,
                  });
                }}
              >
                分享經驗
              </Link>
              <div style={{ position: 'relative' }}>
                {!isLoggedIn && (
                  <button
                    className={styles.loginBtn}
                    onClick={(): void => {
                      login();
                    }}
                  >
                    登入
                  </button>
                )}
                {isLoggedIn && (
                  <PopoverToggle
                    popoverClassName={styles.popover}
                    popoverContent={
                      <ul className={styles.popoverItem}>
                        <li>
                          <Link to="/me/subscriptions/current">我的方案</Link>
                        </li>
                        <li>
                          <Link to="/me">管理我的資料</Link>
                        </li>
                        <li>
                          <button onClick={logout}>登出</button>
                        </li>
                      </ul>
                    }
                  >
                    <div className={styles.userNameBtn}>
                      {user && user.name}
                    </div>
                  </PopoverToggle>
                )}
              </div>
            </div>
          </nav>
=======
          <HamburgerButton isNavOpen={isNavOpen} toggle={toggleNav} />
          <Logo />
          <ResponsiveSearchbar inputRef={searchInputRef} />
          <Nav
            isNavOpen={isNavOpen}
            isLoggedIn={isLoggedIn}
            login={login}
            onClickShareData={onClickShareData}
          />
>>>>>>> upstream/master:src/components/App/Header/index.js
        </Wrapper>
      </header>
    </div>
  );
};

<<<<<<< HEAD:src/components/App/Header/index.tsx
=======
const HamburgerButton = ({ isNavOpen, toggle }) => (
  <div
    className={cn(styles.mHeaderButton, { [styles.isNavOpen]: isNavOpen })}
    onClick={toggle}
  >
    <span />
  </div>
);

HamburgerButton.propTypes = {
  isNavOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

Header.propTypes = {
  searchInputRef: PropTypes.any,
};

>>>>>>> upstream/master:src/components/App/Header/index.js
export default Header;
