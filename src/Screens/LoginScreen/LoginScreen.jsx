import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import './LoginScreen.css'

const STORAGE_KEY = 'wsp_user_profile'

export default function LoginScreen({ onLogin }) {
    const [phase, setPhase] = useState('splash') 
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const [progress, setProgress] = useState(0)
    const navigate = useNavigate()

    
    useEffect(() => {
        const t = setTimeout(() => setPhase('form'), 2500)
        return () => clearTimeout(t)
    }, [])

    const handleSubmit = () => {
        if (!name.trim()) { setError('Ingresá tu nombre'); return }
        if (!phone.trim() || phone.length < 8) { setError('Ingresá un número válido'); return }
        setError('')
        setPhase('loading')

        
        let p = 0
        const interval = setInterval(() => {
            p += Math.random() * 18 + 5
            if (p >= 100) {
                p = 100
                clearInterval(interval)
                
                const profile = { name: name.trim(), phone: phone.trim(), avatar: null }
                localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
                setTimeout(() => {
                    setPhase('done')
                    setTimeout(() => onLogin(profile), 600)
                }, 300)
            }
            setProgress(Math.min(p, 100))
        }, 120)
    }

    const handleKey = (e) => {
        if (e.key === 'Enter') handleSubmit()
    }

    return (
        <div className="login_screen">

           
            {phase === 'splash' && (
                <div className="login_splash">
                    <div className="login_splash__logo">
                        <svg viewBox="0 0 24 24" fill="white" width="72" height="72">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                    </div>
                    <div className="login_splash__bottom">
                        <div className="login_splash__spinner">
                            <div className="login_splash__spinner_dot" />
                            <div className="login_splash__spinner_dot" />
                            <div className="login_splash__spinner_dot" />
                        </div>
                        <p>Cargando WhatsApp...</p>
                    </div>
                </div>
            )}


            {phase === 'form' && (
                <div className="login_form">
                    <div className="login_form__header">
                        <svg viewBox="0 0 24 24" fill="#00a884" width="48" height="48">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        <h1>Bienvenido a WhatsApp clone</h1>
                        <p>Ingresá tu nombre y número para comenzar</p>
                    </div>

                    <div className="login_form__body">
                        <div className="login_form__field">
                            <label>Tu nombre</label>
                            <input
                                type="text"
                                placeholder="Ej: Juan"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                onKeyDown={handleKey}
                                maxLength={30}
                                autoFocus
                            />
                        </div>

                        <div className="login_form__field">
                            <label>Número de teléfono</label>
                            <div className="login_form__phone">
                                <span className="login_form__prefix">🇦🇷 +54</span>
                                <input
                                    type="tel"
                                    placeholder="11 1234 5678"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                                    onKeyDown={handleKey}
                                    maxLength={12}
                                />
                            </div>
                        </div>

                        {error && <p className="login_form__error">{error}</p>}

                        <button className="login_form__btn" onClick={handleSubmit}>
                            Continuar
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </button>

                        <p className="login_form__terms">
                            Al continuar aceptás nuestros <span>Términos del servicio</span> y <span>Política de privacidad</span>
                        </p>
                    </div>
                </div>
            )}

        
            {(phase === 'loading' || phase === 'done') && (
                <div className={`login_loading ${phase === 'done' ? 'login_loading--done' : ''}`}>
                    <div className="login_loading__avatar">
                        <span>{name.charAt(0).toUpperCase()}</span>
                    </div>
                    <h2>Hola, {name} 👋</h2>
                    <p>Configurando tu cuenta...</p>
                    <div className="login_loading__bar">
                        <div
                            className="login_loading__fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="login_loading__pct">{Math.round(progress)}%</span>
                </div>
            )}
        </div>
    )
}