cd ui
npm run build
rm -rf /var/www/html/seinfeld-trivia/dist/
cp -r dist /var/www/html/seinfeld-trivia/