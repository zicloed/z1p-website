import React from 'react';

const Header = () => {
    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#282c34', color: 'white' }}>
            <div>
                <img src="/path/to/logo.png" alt="Logo" style={{ height: '40px' }} />
            </div>
            <div>
                <button style={{ padding: '0.5rem 1rem', backgroundColor: '#61dafb', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Connect Wallet
                </button>
            </div>
        </header>
    );
};

export default Header;