
set -e
set -v

if [ ! -f updated ]; then
        echo "updating"
        sudo apt-get update -y
        touch updated
    else
        echo "already updated skipping"
fi
sudo apt-get install git -y


if [  "$GIT_BRANCH" = "" ];then
    GIT_BRANCH="master"
fi

echo "git branch is $GIT_BRANCH"

FOLDER_NAME=tests

rm -rf $FOLDER_NAME
git clone https://github.com/cloudify-cosmo/getcloudify-widget-selenium-tests.git $FOLDER_NAME
cd $FOLDER_NAME
git checkout $GIT_BRANCH



if [ ! -f /usr/bin/node ];then
    echo "installing node"
    NODEJS_VERSION=0.10.35
    NODEJS_HOME=/opt/nodejs
    sudo mkdir -p $NODEJS_HOME
    sudo chown $USER:$USER $NODEJS_HOME
    curl --fail --silent http://nodejs.org/dist/v${NODEJS_VERSION}/node-v${NODEJS_VERSION}-linux-x64.tar.gz -o /tmp/nodejs.tar.gz
    tar -xzf /tmp/nodejs.tar.gz -C ${NODEJS_HOME} --strip-components=1
    sudo ln -s /opt/nodejs/bin/node /usr/bin/node
    sudo ln -s /opt/nodejs/bin/npm /usr/bin/npm
else
    echo "node already installed"
fi

if [ ! -f /usr/bin/java ];then
    sudo apt-get install openjdk-7-jre-headless -y
else
    echo "java already instaled"
fi


sudo npm install -g grunt-cli
sudo npm cache clean
sudo rm -rf node_modules
npm install
grunt test



