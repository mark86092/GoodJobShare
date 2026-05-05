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
import cn from 'classnames';
import ReactGA from 'react-ga4';
import { Wrapper } from 'common/base';
import GjLogo from 'common/icons/GjLogo.svg';
import Glike from 'common/icons/Glike.svg';
import useShareLink from 'hooks/experiments/useShareLink';
import usePermission from 'hooks/usePermission';
import useMobile from 'hooks/useMobile';
import { useIsLoggedIn } from 'hooks/auth';
import { useLogin } from 'hooks/login';
import { fetchInbox } from 'actions/inbox';

import styles from './Header.module.css';
import SiteMenu from './SiteMenu';
import Top from './Top';
import ProgressTop from './Top/ProgressTop';
import Searchbar from './Searchbar';
import { GA_CATEGORY, GA_ACTION } from 'constants/gaConstants';
import InboxPopoverContainer from './InboxPopoverContainer';
import NamePopoverContainer from './NamePopoverContainer';
import HamburgerButton from './HamburgerButton';
import usePolling from 'hooks/usePolling';

const onClickShareData = () => {
  ReactGA.event({
    category: GA_CATEGORY.HEADER,
    action: GA_ACTION.CLICK_SHARE_DATA,
  });
};

const HeaderTop = () => {
  const location = useLocation();
  const isLoggedIn = useIsLoggedIn();
  const shareLink = useShareLink();

  return useMemo(() => {
    if (!isLoggedIn && location.pathname === '/') {
      return null;
    }

    return (
      <Top to={shareLink}>
        <ProgressTop />
      </Top>
    );
  }, [isLoggedIn, location.pathname, shareLink]);
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
              <InboxPopoverContainer />
              <NamePopoverContainer />
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
          <HamburgerButton isNavOpen={isNavOpen} toggle={toggleNav} />
          <Logo />
          <ResponsiveSearchbar inputRef={searchInputRef} />
          <Nav
            isNavOpen={isNavOpen}
            isLoggedIn={isLoggedIn}
            login={login}
            onClickShareData={onClickShareData}
          />
        </Wrapper>
      </header>
    </div>
  );
};

Header.propTypes = {
  searchInputRef: PropTypes.any,
};

export default Header;
