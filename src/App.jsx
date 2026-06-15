import { useEffect, useRef, useState } from 'react'
import { chars as defaultChars, version as defaultVersion } from './scene/_'
import './App.css'

const defaultTimeoutMs = 1500
const defaultChoiceTimeoutMs = 2000

const sceneModules = import.meta.glob('./scene/*.js')

function matchesShowIf(showif, selectedKey) {
    if (!showif) return true
    if (Array.isArray(showif)) {
        return showif.includes(selectedKey)
    }
    return showif === selectedKey
}

function safeString(value) {
    return value && value !== 'null' ? value : ''
}

function replaceNameToken(value) {
    if (typeof value !== 'string') return value
    const displayName = localStorage.getItem('gichv2-name') || '[name]'
    return value.replace(/\$\{name\}/g, displayName)
}

function renderHtmlContent(value) {
    const content = replaceNameToken(value)
    if (typeof content !== 'string') return content
    if (/<[a-z][\s\S]*>/i.test(content)) {
        return <span dangerouslySetInnerHTML={{ __html: content }} />
    }
    return content
}

function App() {
    const [name, setName] = useState('[name]')
    const [pfpUrl, setPfpUrl] = useState('./pfp/you.png')
    const [selectedKey, setSelectedKey] = useState('')
    const [selectedChar, setSelectedChar] = useState(null)
    const [chatItems, setChatItems] = useState([])
    const [callItems, setCallItems] = useState([])
    const [choiceOptions, setChoiceOptions] = useState([])
    const [choiceSelected, setChoiceSelected] = useState('')
    const [routeChars, setRouteChars] = useState(null)
    const [routeVersion, setRouteVersion] = useState(null)
    const [routeLoaded, setRouteLoaded] = useState(false)

    const timeoutRef = useRef(null)
    const nextIndexRef = useRef(0)
    const activeCharRef = useRef(null)
    const chatListRef = useRef(null)

    useEffect(() => {
        const storedName = localStorage.getItem('gichv2-name')
        if (!storedName || storedName === 'null') {
            const promptName = prompt('Please enter your name (max 15 characters)', '[name]')
            let finalName = promptName && promptName !== 'null' ? promptName : '[name]'
            finalName = finalName.slice(0, 15)
            setName(finalName)
            localStorage.setItem('gichv2-name', finalName)
        } else {
            setName(storedName)
        }

        const storedPfp = localStorage.getItem('gichv2-pfp')
        if (storedPfp && storedPfp !== 'null') {
            setPfpUrl(storedPfp)
            // Preload the profile picture
            const img = new Image()
            img.src = storedPfp
        } else {
            setPfpUrl('./pfp/you.png')
        }

        setBackgroundImage()
    }, [])

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    useEffect(() => {
        const checkAndAlert = () => {
            const isPortrait = window.innerHeight > window.innerWidth;
            const isMobile = window.innerWidth < 768;
            const hasShown = localStorage.getItem('orientationAlertShown');

            if ((isPortrait || isMobile) && !hasShown) {
                alert("Attention! Page best viewed in landscape orientation and optimized for PC 2560 × 1600 and iPhone 13 Pro screens.");
                localStorage.setItem('orientationAlertShown', 'true');
            }
        };

        checkAndAlert();

        const handleResize = () => checkAndAlert();
        const handleOrientationChange = () => checkAndAlert();

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleOrientationChange);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);

    useEffect(() => {
        const resolveScenePath = (pathname) => {
            const baseUrl = import.meta.env.BASE_URL || '/'
            const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
            let relativePath = pathname

            if (normalizedBaseUrl !== '/' && relativePath.startsWith(normalizedBaseUrl)) {
                relativePath = relativePath.slice(normalizedBaseUrl.length)
            }

            const cleanPath = relativePath
                .replace(/^\//, '')
                .replace(/\/$/, '')
                .replace(/\//g, '.')
            return cleanPath ? `./scene/${cleanPath}.js` : null
        }

        const loadVersion = async () => {
            const pathname = window.location.pathname || '/'
            const modulePath = resolveScenePath(pathname)

            if (!modulePath) {
                setRouteChars(null)
                setRouteVersion(null)
                setRouteLoaded(true)
                return
            }

            const loader = sceneModules[modulePath]
            if (!loader) {
                setRouteChars(null)
                setRouteVersion(null)
                setRouteLoaded(true)
                return
            }

            try {
                const module = await loader()
                setRouteChars(module.chars || null)
                setRouteVersion(module.version || null)
            } catch (error) {
                console.warn(`Unable to load ${modulePath}`, error)
                setRouteChars(null)
                setRouteVersion(null)
            }
            setRouteLoaded(true)
        }

        loadVersion()

        const handlePopState = () => {
            loadVersion()
        }

        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [])

    useEffect(() => {
        if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight
        }
    }, [chatItems, choiceOptions])

    const setBackgroundImage = () => {
        const hours = new Date().getHours()
        const image = hours >= 6 && hours <= 12 ? './bg/day.jpeg' : hours > 12 && hours <= 19 ? './bg/evening.jpg' : './bg/night.jpeg'
        document.body.style.backgroundImage = `url(${image})`
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundRepeat = 'no-repeat'
        document.body.style.backgroundPosition = 'center'
    }

    const saveUserName = (newName) => {
        setName(newName)
        localStorage.setItem('gichv2-name', newName)
    }

    const handleChangeName = () => {
        const newName = prompt('Please enter your new name (max 15 characters)', name)
        if (newName && newName !== 'null') {
            const truncatedName = newName.slice(0, 15)
            saveUserName(truncatedName)
        }
    }

    const handlePfpUpload = (event) => {
        const file = event.target.files[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.')
            event.target.value = ''
            return
        }

        const maxSize = 2 * 1024 * 1024
        if (file.size > maxSize) {
            alert('File size must be smaller than 2MB.')
            event.target.value = ''
            return
        }

        const reader = new FileReader()
        reader.onload = function (e) {
            const base64 = e.target.result
            setPfpUrl(base64)
            localStorage.setItem('gichv2-pfp', base64)
        }
        reader.readAsDataURL(file)
    }

    const clearChatTimers = () => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
    }

    const startCharacter = (charKey) => {
        clearChatTimers()
        setSelectedKey(charKey)
        setChoiceOptions([])
        setChoiceSelected('')
        setCallItems([])
        setChatItems([])

        const char = routeChars.find((item) => item.key === charKey)
        if (!char) return

        const clonedChar = {
            ...char,
            chats: JSON.parse(JSON.stringify(char.chats))
        }

        activeCharRef.current = clonedChar
        setSelectedChar(clonedChar)
        nextIndexRef.current = 0
        playNextAction(0, clonedChar, '')
    }

    const playNextAction = (index, char, selectedChoice) => {
        if (!char || !char.chats) return

        let currentIndex = index
        while (currentIndex < char.chats.length) {
            const chat = char.chats[currentIndex]
            if (selectedChoice && chat.showif && !matchesShowIf(chat.showif, selectedChoice)) {
                currentIndex += 1
                continue
            }

            // timeout of 4000 means the item will take 4 seconds to appear on screen
            const timeout = chat.timeout != null ? chat.timeout : defaultTimeoutMs
            nextIndexRef.current = currentIndex + 1

            if (chat.type === 'choice') {
                timeoutRef.current = window.setTimeout(() => {
                    setChoiceOptions(chat.content || [])
                    setChoiceSelected(selectedChoice)
                }, timeout)
                return
            }

            if (chat.type === 'call') {
                timeoutRef.current = window.setTimeout(() => {
                    setCallItems((prev) => [...prev, chat])
                    playNextAction(currentIndex + 1, char, selectedChoice)
                }, timeout)
                return
            }

            timeoutRef.current = window.setTimeout(() => {
                if (chat.type === 'text' || chat.type === 'emote' || chat.type === 'pic' || chat.type === 'notif') {
                    setCallItems([])
                }
                appendChatItem(chat)

                if (chat.type === 'call-end') {
                    setCallItems([])
                }

                playNextAction(currentIndex + 1, char, selectedChoice)
            }, timeout)
            return
        }

        timeoutRef.current = window.setTimeout(() => {
            setChatItems((prev) => [...prev, { type: 'notif', content: '- This chat has ended -' }])
            timeoutRef.current = null
        }, 2000)
    }

    const appendChatItem = (chat) => {
        if (chat.type === 'ts' || chat.type === 'notif') {
            setChatItems((prev) => [...prev, { type: chat.type, content: chat.content }])
            return
        }

        if (chat.type === 'text' || chat.type === 'emote' || chat.type === 'pic') {
            setChatItems((prev) => [...prev, chat])
            return
        }

        if (chat.type === 'pause') {
            setChatItems((prev) => [...prev, { type: 'pause' }])
            return
        }
    }

    const handleChoiceSelect = (key, timeout) => {
        if (!activeCharRef.current) return
        const choice = choiceOptions.find((item) => item.key === key)
        if (!choice) return

        const outgoing = {
            type: choice.call ? 'call' : choice.pic ? 'pic' : choice.text ? 'text' : 'emote',
            dir: 'out',
            content: choice.call ?? choice.pic ?? choice.text ?? choice.emote,
            showif: key,
            timeout: choice.timeout ?? defaultTimeoutMs
        }

        if (outgoing.type === 'call') {
            setCallItems((prev) => [...prev, outgoing])
        } else {
            setChatItems((prev) => [...prev, outgoing])
        }
        setChoiceOptions([])
        setChoiceSelected(key)
        clearChatTimers()
        timeoutRef.current = window.setTimeout(() => {
            playNextAction(nextIndexRef.current, activeCharRef.current, key)
        }, choice.nextTimeout ?? 0)
    }

    return (
        <div className="main">
            <div className="content">
                {!routeLoaded ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <p>Loading...</p>
                    </div>
                ) : routeChars === null ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <img src="./paimon.webp" alt="paimon" style={{ maxWidth: '300px', marginBottom: 10 }} />
                        <p style={{ fontSize: '1.5rem', color: '#fff' }}>Uhhh... How about we explore the area ahead of us later?</p>
                    </div>
                ) : (
                    <>
                        <div className="c1">
                            <div className="info-section">
                                <span id="pfp-preview" onClick={() => document.getElementById('pfp-upload').click()}>
                                    <img src={pfpUrl} alt="PFP" />
                                </span>
                                <div><span id="your-name" onClick={handleChangeName}>{name}</span>'s Phone 📱</div>
                                <input
                                    id="pfp-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePfpUpload}
                                    style={{ display: 'none' }}
                                />
                            </div>

                            <div id="char-list">
                                {routeChars.map((c) => (
                                    <div className="char-item" key={c.key}>
                                        <button
                                            className={selectedKey === c.key ? 'selected' : ''}
                                            type="button"
                                            onClick={() => startCharacter(c.key)}
                                        >
                                            <img className="char-pic" src={c.pfp} alt={c.name} />
                                            <div className="char-name">{c.name}</div>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="c2">
                            <div id="chat-name" className="chat-name">
                                {selectedChar ? selectedChar.name : "‎"}
                            </div>

                            <div className="chat-list-wrapper">
                                <div ref={chatListRef} className={`chat-list ${callItems.length ? 'hidden' : ''}`}>
                                    {chatItems.map((item, index) => {
                                        if (item.type === 'ts') {
                                            return (
                                                <div className="chat-ts" key={index}>
                                                    - <span>{renderHtmlContent(item.content)}</span> -
                                                </div>
                                            )
                                        }
                                        if (item.type === 'notif') {
                                            return (
                                                <div className="chat-notif" key={index}>
                                                    {renderHtmlContent(item.content)}
                                                </div>
                                            )
                                        }
                                        if (item.type === 'pause') {
                                            return <div className="chat-pause" key={index} />
                                        }
                                        return (
                                            <div className={`chat-bubble ${item.dir === 'out' ? 'out' : 'in'}`} key={index}>
                                                {item.dir === 'in' ? (
                                                    <>
                                                        <div className="left">
                                                            <img className="char-pic" src={selectedChar?.chatpfp ?? selectedChar?.pfp} alt="char" />
                                                        </div>
                                                        <div className="right">
                                                            <div className="char-name">{selectedChar?.name}</div>
                                                            {item.type === 'text' && <div className="message">{renderHtmlContent(item.content)}</div>}
                                                            {item.type === 'emote' && <img className="emote" src={item.content} alt="emote" />}
                                                            {item.type === 'pic' && <img className="pic" src={item.content} alt="pic" />}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="left">
                                                            <div className="char-name">{name}</div>
                                                            {item.type === 'text' && <div className="message">{renderHtmlContent(item.content)}</div>}
                                                            {item.type === 'emote' && <img className="emote" src={item.content} alt="emote" />}
                                                            {item.type === 'pic' && <img className="pic" src={item.content} alt="pic" />}
                                                        </div>
                                                        <div className="right">
                                                            <img className="char-pic" src={pfpUrl} alt="you" />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className={`call-list ${!callItems.length ? 'hidden' : ''}`}>
                                    {callItems.length > 0 && (
                                        <div className="tray">
                                            <div className="icon mic">
                                                <img src="./icons/mic_on.svg" alt="mic" />
                                            </div>
                                            <div className="icon cam">
                                                <img src="./icons/cam_on.svg" alt="cam" />
                                            </div>
                                            <div className="icon">
                                                <img src="./icons/hangup.svg" alt="hangup" />
                                            </div>
                                        </div>
                                    )}
                                    {callItems.map((item, index) => (
                                        <div className={`message ${item.dir}`} key={index}>
                                            {renderHtmlContent(item.content)}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={`choice-list ${!choiceOptions.length ? 'hidden' : ''}`}>
                                {choiceOptions.map((option) => (
                                    <button key={option.key} className="choice-btn" onClick={() => handleChoiceSelect(option.key, option.timeout)}>
                                        {option.emote ? (
                                            <img className="choice-image" src={option.emote} alt={replaceNameToken(option.text || option.emote)} />
                                        ) : option.pic ? (
                                            <img className="choice-image" src={option.pic} alt={replaceNameToken(option.text || option.pic)} />
                                        ) : (
                                            renderHtmlContent(option.text || option.call || option.emote || option.pic)
                                        )}
                                    </button>
                                ))}
                            </div>

                        </div>
                    </>
                )}
            </div>

            <div id="version">{routeVersion && `v. ${routeVersion}`}</div>
        </div>
    )
}

export default App
