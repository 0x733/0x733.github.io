const CerezYonetici = {
    ayarla(isim, deger, secenekler = {}) {
        const varsayilanlar = {
            sure: 31536000,
            yol: '/',
            guvenli: true,
            httpSade: true,
            ayniSite: 'Strict',
            alan: window.location.hostname
        };

        const ayarlar = {...varsayilanlar, ...secenekler};
        const sonlanma = ayarlar.sure ? `max-age=${ayarlar.sure};` : '';
        const guvenlik = `Secure;SameSite=${ayarlar.ayniSite};${ayarlar.httpSade ? 'HttpOnly;' : ''}`;

        document.cookie = `${isim}=${deger};` +
                         `${sonlanma}` +
                         `${guvenlik}` +
                         `path=${ayarlar.yol};` +
                         `domain=${ayarlar.alan}`;
    },

    al(isim) {
        return document.cookie
            .split(';')
            .map(c => c.trim())
            .reduce((acc, cur) => {
                const [k, v] = cur.split('=').map(decodeURIComponent);
                return k === isim ? v : acc;
            }, null);
    },

    depo: {
        kaydet(anahtar, veri) {
            const sifrelenmis = btoa(JSON.stringify(veri));
            localStorage.setItem(anahtar, sifrelenmis);
            sessionStorage.setItem(`${anahtar}_token`, btoa(Date.now()));
        },

        oku(anahtar) {
            const veri = localStorage.getItem(anahtar);
            return veri ? JSON.parse(atob(veri)) : null;
        }
    },

    oturumBaslat() {
        this.ayarla('oturum', btoa(Math.random()), {sure: 3600});
        this.ayarla('ziyaretci', btoa(Date.now()));
        this.depo.kaydet('kullanici', {
            id: Math.random().toString(36).slice(2),
            giris: new Date().toISOString()
        });
    }
};

export default CerezYonetici;