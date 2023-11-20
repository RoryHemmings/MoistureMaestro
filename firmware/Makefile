all: build
build: src/main.cpp
	pio run

upload:
	pio run --target upload

monitor:
	minicom -D /dev/ttyACM0 -b 9600

clean:
	pio run --target clean
