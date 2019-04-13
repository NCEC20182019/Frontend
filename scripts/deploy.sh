#!/usr/bin/env bash

echo 'Copy files...'

scp -i ~/.ssh/id_rsa \
    target/Front-0.0.1-SNAPSHOT.jar \
    $REMOTEUSER@$REMOTEHOST:$REMOTEAPPDIR

echo 'Bye'
