DATABASE_DOCKER_ID=d497
echo 'start';
docker start $DATABASE_DOCKER_ID &&
cd /home/blog/app/ &&
git pull &&
docker build -t howard/next-blog-app . &&
docker kill app &&
docker rm app &&
docker run --name app --network=host -p 3000:3000 -d howard/next-blog-app &&
echo 'OK!'