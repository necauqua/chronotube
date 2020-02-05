
NAME=$(notdir $(shell pwd))

${NAME}.zip: clean
	zip -r ${NAME} src manifest.json LICENSE

clean:
	rm -f ${NAME}.zip

