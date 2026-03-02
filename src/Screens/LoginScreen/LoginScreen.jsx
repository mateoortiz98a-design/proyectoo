import React from 'react'

export default function LoginScreen() {
    return (
        <div>
            <Form className="login_form" onSubmit={(e) => {
                e.preventDefault()

            };
        >
            <h2>Login</h2>
            <input type="text" placeholder="Username" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </Form>

    </div    > 
  )
}
