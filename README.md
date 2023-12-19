# Stažení souborů projektu
```sh
cd /var
git clone https://github.com/Vofy/VUT-FEKT-BPC-MDS-Projekt pexel
```

# Příprava skriptu pro streamování

Prerekvizitou je přítomnost prostředí python. V GNU/Linux balíky `python3` nebo `python` a balíky. Ve windows instalace pomocí PE dostupné na url adrese [Python Releases for Windows | Python.org](https://www.python.org/downloads/windows/). Také je vyžadována přítomnost balíkového manažeru pip v linuxu obvykle balíky `python3-pip` nebo `python-pip`.

## Instalace pythonu a stažení závislostí

Příklad instalace v distribuci ArchLinux

```sh
sudo pacman -Syu python python-pip
cd /var/pexel/ffmpeg-streams
python -m venv venv
source ./venv/bin/activate
pip install -r requirements.txt
```

# Kompilace nginx

```sh
mkdir nginx-mod
cd nginx-mod

wget  http://nginx.org/download/nginx-1.25.3.tar.gz
git clone https://github.com/arut/nginx-rtmp-module.git
tar -xvf nginx-1.25.3.tar.gz
cd nginx-1.25.3

./configure \
    --prefix=/var/pexel \
	--sbin-path=/usr/sbin/nginx-mod \
	--modules-path=/usr/lib/nginx-mod/modules \
    --http-client-body-temp-path=/var/lib/nginx-mod/body \
    --http-fastcgi-temp-path=/var/lib/nginx-mod/fastcgi \
    --http-proxy-temp-path=/var/lib/nginx-mod/proxy \
    --http-scgi-temp-path=/var/lib/nginx-mod/scgi \
    --http-uwsgi-temp-path=/var/lib/nginx-mod/uwsgi \
    --error-log-path=/var/log/nginx-mod/error.log \
    --http-log-path=/var/log/nginx-mod/access.log \
    --with-http_v2_module \
    --add-module=../nginx-rtmp-module

make
make install
cd ../..
```

# Příprava a povolení a spuštění démonů
```sh
cd /var/pexel
sudo ln -s /var/pexel/systemd-units /etc/systemd/system/pexel
sudo systemctl enable --now ffmpeg-streams.service nginx-mod.serivce
```