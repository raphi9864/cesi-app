#!/bin/bash
cd /home/rapha/dev/delivery_app/client

# Nettoyer node_modules et package-lock.json
rm -rf node_modules package-lock.json

# Installer explicitement React et React DOM en version 18
npm install react@18.2.0 react-dom@18.2.0 --save

# Réinstaller toutes les dépendances
npm install 