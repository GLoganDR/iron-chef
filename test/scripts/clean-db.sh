#!/bin/bash

mongoimport --jsonArray --drop --db $1 --collection recipes --file ../../db/recipes.json

