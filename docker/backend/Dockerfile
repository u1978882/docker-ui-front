# FROM alpine:latest

# ARG PB_VERSION=0.22.12

# RUN apk add --no-cache \
#     unzip \
#     ca-certificates

# # download and unzip PocketBase
# ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
# RUN unzip /tmp/pb.zip -d /pb/

# # uncomment to copy the local pb_migrations dir into the image
# # COPY ./pb_migrations /pb/pb_migrations

# # uncomment to copy the local pb_hooks dir into the image
# # COPY ./pb_hooks /pb/pb_hooks

# EXPOSE 8080

# # start PocketBase
# CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]










FROM golang:1.22  AS docktopus-api

WORKDIR /usr/src/app

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY back/go.mod back/go.sum ./
RUN go mod download && go mod verify

COPY ./back .
RUN go build -v -o /usr/local/bin/app ./...
EXPOSE 80
CMD ["app", "serve", "--http=0.0.0.0:80"]
