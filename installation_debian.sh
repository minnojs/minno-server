sudo apt update
sudo apt install nodejs
sudo apt install npm

sudo npm cache clean -f
sudo npm install -g n
sudo n latest

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 4B7C549A058F8B6B
echo "deb http://repo.mongodb.org/apt/debian "$(lsb_release -sc)"/mongodb-org/4.2 main" | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt update
sudo apt-get install mongodb-org
sudo systemctl start mongod.service



npm install

sudo npm run setup

sudo npm run start
