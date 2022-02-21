# FoodMix

> Api công thức nấu ăn, sử dụng Typescript. Hỗ trợ RestFul và Graphql

<p align="center">
<img src="https://i.imgur.com/VQQWPx9.jpg" alt="">
</p>

## Tính Năng
- Nodejs, NOSQL, VueJS, Graphql
- Tailwind + Font Awesome 5
- Đăng nhập, Đăng ký, Xác thực, Khôi phục
- Thông tin món ăn: Nguyên liệu, Cách làm, Đánh giá
- Tính khẩu phần ăn
- Bình luận Facebook, Lượt xem
- Tải chậm hình ảnh, Canvas, Tương thích mọi thiết bị
- Tìm kiếm, bộ lọc
- Cài đặt tài khoản
- Trang cá nhân
- Studio upload

## Cài Đặt server
- Reverse proxy: [Nginx](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)
- Database: [Mongodb](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-20-04)
- [Nodejs](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04) - Option 2


## .env
> Bạn cần thiết lập các biến môi trường trước khi sử dụng.
> Các file .env nằm ở `src/environment/env` lần lượt là `development.env` `production.env` `test.env`
> Example: [.env](https://github.com/dnstylish/foodmix-type/tree/master/src/environment)

## Storage - 🚧 - [BunnyCDN](https://bunny.net/)
Chúng tôi sủ dụng BunnyCDN làm máy chủ lưu trữ. Lý do: [Review](https://www.techradar.com/reviews/bunny-cdn)

```
BUNNY_STORAGE_NAME=
BUNNY_STORAGE_SERVER=
BUNNY_ACCESS_KEY=
CDN_DOMAIN=
```
- Để bảo mật tài nguyên vui lòng đặt ```SECURE_ENABLE = 1```
- Xem thêm: [How to sign URLs](https://support.bunny.net/hc/en-us/articles/360016055099-How-to-sign-URLs-for-BunnyCDN-Token-Authentication)
## Sử dụng
### Development
Môi trường phát triển hoặc test

```
# Cài đặt npm
npm run dev

# Setup các biến môi trường *.env

# Khởi chạy project
npm run dev
```

## Watermark - 🚧 
Để thay đổi watermark, hãy gi đè các file tại `src/environment/watermark`

## Quảng Cáo - 🚧
- Để thay đổi mã quảng cáo, hãy gi đè các file tại `src/environment/ads`
> Vì lý do chính sách. Bạn có thể tắt quảng cáo trên những trang mình muốn.

## Studio: FoodMix - Studio - 🚧
- Giao diện đăng công thức
- Bật tắt quảng cáo
- Chapter thumbnail, chapter scheduler
- Cắt/Nén ảnh tự động lên CDN mỗi khi create/update/delete
- Phân quyền, bảo mật

## Scrapper Tool
> Liên Hệ [dnstylish@gmail.com](mailto:dnstylish@gmail.com) nếu bạn cần giúp đỡ.

## Sao Lưu


Maintaining even a small mongodb application in production requires regular backups of remotely stored data. MongoDB gives you [three ways](http://docs.mongodb.org/manual/core/backups/) to acomplish it. In this post I'm using `monogodump` command for creating a backup and `mongorestore` for recreating the data.
The purpose of this writing is to provide a simple way of periodic database dumps from a remote server to a Dropbox cloud storage.

> Remember that for using `mongodump` you have to have a `mongod` process running.

### Dumping a database

Suppose that you want make a backup of your `books` database.

To create a dump use `mongodump -d books -o <destination_folder>` which will result in a `book` folder containing bson files with all collections.
For backup purposes we will compress it all to one file:
`tar -zcvf books.tar.gz books/`.

### Dropbox uploader

To send the backup of the database to your Drobpox cloud storage install [dropbox uploader script](https://github.com/andreafabrizi/Dropbox-Uploader) on the remote server:

First, download the script:
```
curl "https://raw.githubusercontent.com/andreafabrizi/Dropbox-Uploader/master/dropbox_uploader.sh" -o dropbox_uploader.sh
```
Change the permissions:
```
chmod +x dropbox_uploader.sh
```
Launch the setup process:
```
./dropbox_uploader.sh
```
The script will guide you through all necessary steps to connect the remote machine with your Dropbox account. During the installation process you will be asked to navigate to your Dropbox web page, create an application and providing app key and app secret for the download script.

After a successfull installation you can try out the connection uploading the `books`:
```
/root/downloads/dropbox_uploader.sh upload books.tar.gz /
```

The ending slash means that the file will be uploaded to the root directory of your Dropbox application.

The complete script for creating an archive and uploading, let's name it `mongodb_upload.sh`:

```bash
#!/usr/bin/env bash

#Get current date
NOW="$(date +'%d-%m-%Y_%H-%M')"

# Settings:

# Path to a temporary directory
DIR=~/mongodb_dump/

# Path to the target dropbox directory
TARGET_DIR=/

# Path do dropbox_uploader.sh file
UPLOADER_SCRIPT=/root/scripts/dropbox_uploader.sh

# Name of the database
DB_NAME=books

function mongodb_dump
{
  # Name of the compressed file
  FILE="${DIR}${DB_NAME}_${NOW}.tar.gz"

  # Dump the database
  mongodump -d $DB_NAME -o $DIR

  # Compress
  tar -zcvf $FILE $DIR$DB_NAME

  # Remove the temporary database dump directory
  rm -fr $DB_NAME

  # Upload the file
  $UPLOADER_SCRIPT upload $FILE $TARGET_DIR

  # Remove the file
  rm $FILE
}

mongodb_dump
```

After running the script navigate to your Dropbox `Applications` folder and look for a folder named after the application you created during the installation process. The `books.tar.gz` file should be there already.

### Setting a cronjob

You can have the script executed periodically by seting a cron job. To edit the crontab file responsible for registering new cron tasks run: `crontab -e`.
To perform an action at 01.45 am add this line:
`45 01 * * * <path to the script>/mongo_upload.sh`
Save the file and check the list of your cron tasks: `crontab -l`
More about crontab: http://v1.corenominal.org/howto-setup-a-crontab-file/

### Restoring a backup - 🚧
To restore the data uncompress the file and run:
`mongorestore --drop -d <database-name> <directory-of-dumped-backup>`

## License
- Email: dnstylish@gmail.com
- Designed by FoodMix
