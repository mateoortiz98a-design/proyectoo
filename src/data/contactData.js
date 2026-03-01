const contacts = [
    {
        id: 1,
        name: 'Yoda',
        last_time_connection: 'Hace 2 horas',
        profile_picture: 'https://images.immediate.co.uk/production/volatile/sites/3/2017/12/yoda-the-empire-strikes-back-28a7558.jpg?quality=90&webp=true&resize=800,534',
        number: '113456789',
        messages: [
            {
                id: 1,
                text: 'Hola, como estas?',
                send_by_me: true, 
                created_at: '2024-06-01T12:00:00Z',
                is_read: true
            },
            {
                id: 2,
                text: 'Bien yo estoy',
                send_by_me: false,
                created_at: '2024-06-01T12:05:00Z',
                is_read: false
            }
        ]
    },
    {
        id: 2,
        name: 'Pepe',
        last_time_connection: 'Hace 3 horas',
        profile_picture: 'https://www.clarin.com/img/2022/01/20/GWR2-6fo__1256x620__1.jpg',
        number: '1134567424 ',
        messages: [
            {
                id: 1,
                text: 'Holaaa',
                send_by_me: true, 
                created_at: '2024-06-01T12:00:00Z',
                is_read: true
            },
            {
                id: 2,
                text: 'Bien yo estoy',
                send_by_me: false,
                created_at: '2024-06-01T12:05:00Z',
                is_read: false
            }
        ]
    },
    {
        id: 3,
        name: 'cartman',
        last_time_connection: 'Hace 1 hora',
        profile_picture: 'https://i.pinimg.com/originals/85/0e/20/850e205d98fbaedd5c314363f1d7aad5.png',
        number: '113453489',
        messages: [
            {
                id: 1,
                text: 'Holaaa',
                send_by_me: true, 
                created_at: '2024-06-01T12:00:00Z',
                is_read: true
            },
            {
                id: 2,
                text: 'Bien yo estoy',
                send_by_me: false,
                created_at: '2024-06-01T12:05:00Z',
                is_read: false
            }
        ]
    },{
        id: 4,
        name: 'kenny',
        last_time_connection: 'Hace 30 minutos',
        profile_picture: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4c1742ba-2484-4aa9-9658-aa0e6a1a6292/d8299ms-570fdcd5-bd82-4b6e-8dac-05c56cbcf804.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzRjMTc0MmJhLTI0ODQtNGFhOS05NjU4LWFhMGU2YTFhNjI5MlwvZDgyOTltcy01NzBmZGNkNS1iZDgyLTRiNmUtOGRhYy0wNWM1NmNiY2Y4MDQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.uUW3q8WY-xuM_7vp282q3pHQqfm1PmgcpWiXnlgmGgQ',
        number: '113456439',       
        messages: [
            {
                id: 1,
                text: 'Holaaa',
                send_by_me: true, 
                created_at: '2024-06-01T12:00:00Z',
                is_read: true
            },
            {
                id: 2,
                text: 'Bien yo estoy',
                send_by_me: false,
                created_at: '2024-06-01T12:05:00Z',
                is_read: false
            }
        ]
    }   
]

export default contacts