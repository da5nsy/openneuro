import React, { FC, useContext } from 'react'
import useState from 'react-usestateref'
import { Header, LandingExpandedHeader } from '@openneuro/components'
import { FrontFacetExample } from '@openneuro/components'
import { SearchParamsCtx } from '../search/search-params-ctx'
import { Input } from '@openneuro/components'
import { useLocation, useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { getUnexpiredProfile } from '../authentication/profile'
import FreshdeskWidget from '../freshdesk-widget'

const HeaderContainer: FC = () => {
  const history = useHistory()

  const { pathname: currentPath } = useLocation()
  const expanded = currentPath === '/'

  const [cookies] = useCookies()
  const profile = getUnexpiredProfile(cookies)

  const { searchParams, setSearchParams } = useContext(SearchParamsCtx)
  const keywords = searchParams.keywords

  const [newKeyword, setNewKeyword, newKeywordRef] = useState('')

  const handleSubmit = () => {
    setSearchParams(prevState => ({
      ...prevState,
      keywords: [...keywords, newKeywordRef.current],
    }))
    setNewKeyword('')
    history.push('/search')
  }
  const [isOpenSupport, setSupportIsOpen] = React.useState(false)
  const [isOpenUpload, setUploadIsOpen] = React.useState(false)
  const [isOpenLogin, setLoginIsOpen] = React.useState(false)
  const toggleLogin = () => setLoginIsOpen(prevIsOpen => !prevIsOpen)
  const toggleUpload = () => setUploadIsOpen(prevIsOpen => !prevIsOpen)
  const toggleSupport = () => setSupportIsOpen(prevIsOpen => !prevIsOpen)
  return (
    <Header
      isOpenSupport={isOpenSupport}
      isOpenUpload={isOpenUpload}
      isOpenLogin={isOpenLogin}
      toggleLogin={toggleLogin}
      toggleSupport={toggleSupport}
      toggleUpload={toggleUpload}
      profile={profile}
      onLogin={() => {}}
      onLogout={() => {}}
      onCreateAccount={() => {}}
      expanded={expanded}
      pushHistory={history.push}
      renderOnFreshDeskWidget={() => <FreshdeskWidget />}
      renderOnExpanded={profile => (
        <LandingExpandedHeader
          profile={profile}
          renderFacetSelect={() => (
            <FrontFacetExample {...FrontFacetExample.args} />
          )}
          renderSearchInput={() => (
            <Input
              placeholder="Search"
              type="text"
              name="front-page-search"
              labelStyle="default"
              value={newKeyword}
              setValue={setNewKeyword}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  handleSubmit()
                }
              }}
            />
          )}
          onSearch={() => {
            handleSubmit()
          }}
        />
      )}
    />
  )
}

export default HeaderContainer