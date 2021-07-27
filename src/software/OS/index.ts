const Sys = `
class Sys {
    function void init() {
        do Keyboard.init();
        do Math.init();
        do Memory.init();
        do Output.init();
        do Screen.init();
        do Main.main();
        do Sys.halt();
        return;
    }

    function void halt() {
        while (true) {}
        return;
    }

    function void wait(int duration) {
        var int i, j;

        let i = 0;
        while (i < duration) {
            let j = 0;
            while (j < 300) {
                let j = j + 1;
            }
            let i = i + 1;
        }
        return;
    }

    function void error(int errorCode) {
        do Output.printString("Error:");
        do Output.printInt(errorCode);
        do Sys.halt();
        return;
    }
}
`;

const Math = `
class Math {
    static Array twoToThe;

    function void init() {
        let twoToThe = Array.new(16);
        let twoToThe[0] = 1;
        let twoToThe[1] = 2;
        let twoToThe[2] = 4;
        let twoToThe[3] = 8;
        let twoToThe[4] = 16;
        let twoToThe[5] = 32;
        let twoToThe[6] = 64;
        let twoToThe[7] = 128;
        let twoToThe[8] = 256;
        let twoToThe[9] = 512;
        let twoToThe[10] = 1024;
        let twoToThe[11] = 2048;
        let twoToThe[12] = 4096;
        let twoToThe[13] = 8192;
        let twoToThe[14] = 16384;
        let twoToThe[15] = 16384 + 16384;
        return;
    }

    function int abs(int x) {
        if (x < 0) {
            let x = -x;
        }
        return x;
    }

    function boolean bit(int x, int j) {
        return ~((x & twoToThe[j]) = 0);
    }

    function int twoToThe(int i) {
        return twoToThe[i];
    }

    function int multiply(int x, int y) {
        var int sum, shiftedX, j;
        let sum = 0;
        let shiftedX = x;
        let j = 0;

        while (j < 16) {
            if (Math.bit(y, j)) {
                let sum = sum + shiftedX;
            }
            let shiftedX = shiftedX + shiftedX;
            let j = j + 1;
        }
        return sum;
    }

    function int divide(int x, int y) {
        var boolean pos;
        var int q, result;

        let pos = ((x < 0) = (y < 0));
        let x = Math.abs(x);
        let y = Math.abs(y);

        if (y > x) {
            return 0;
        }
        let q = Math.divide(x, 2 * y);
        if (x - (2 * q * y) < y) {
            let result = 2 * q;
        } else {
            let result = (2 * q) + 1;
        }

        if (pos) {
            return result;
        } else {
            return -result;
        }
    }

    function int sqrt(int x) {
        var int y, j, temp, temp2;
        let y = 0;
        let j = 7;

        while (~(j < 0)) {
            let temp = y + twoToThe[j];
            let temp2 = temp * temp;
            if (~(temp2 > x) & (temp2 > 0)) {
                let y = temp;
            }
            let j = j - 1;
        }
        return y;
    }

    function int max(int a, int b) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }

    function int min(int a, int b) {
        if (a < b) {
            return a;
        } else {
            return b;
        }
    }
}
`;

const Array = `
class Array {
    function Array new(int size) {
        return Memory.alloc(size);
    }

    method void dispose() {
        do Memory.deAlloc(this);
        return;
    }
}
`;

const Memory = `
class Memory {
    static Array memory, freeList;
    static int heapBase, heapBottom;
    static int LENGTH, NEXT, ALLOC_SIZE, NOT_FOUND;

    /** Initializes the class. */
    function void init() {
        let memory = 0;
        let heapBase = 2048;
        let heapBottom = 16384;

        let LENGTH = 0;
        let NEXT = 1;
        let ALLOC_SIZE = -1;
        let NOT_FOUND = 16385;

        let freeList = heapBase;
        let freeList[LENGTH] = heapBottom - heapBase;
        let freeList[NEXT] = null;

        return;
    }

    /** Returns the RAM value at the given address. */
    function int peek(int address) {
        return memory[address];
    }

    /** Sets the RAM value at the given address to the given value. */
    function void poke(int address, int value) {
        let memory[address] = value;
        return;
    }

    /** Finds an available RAM block of the given size and returns
     *  a reference to its base address. */
    function int alloc(int size) {
        var Array foundBlockPrev, foundBlock, nextBlock, block;

        let foundBlockPrev = Memory.bestFitPrev(size);
        if (foundBlockPrev = NOT_FOUND) {
            return 1;
        }

        if (foundBlockPrev = null) {
            let foundBlock = freeList;
        } else {
            let foundBlock = foundBlockPrev[NEXT];
        }
        let block = foundBlock + 1;

        // get nextBlock and set block[ALLOC_SIZE]
        if (foundBlock[LENGTH] > (size + 3)) { // 2 block for freeList, 1 block for allocated block
            let nextBlock = foundBlock + size + 1;
            let nextBlock[NEXT] = foundBlock[NEXT];
            let nextBlock[LENGTH] = foundBlock[LENGTH] - size - 1;
            let block[ALLOC_SIZE] = size + 1;
        } else {
            let nextBlock = foundBlock[NEXT];
            let block[ALLOC_SIZE] = foundBlock[LENGTH];
        }

        // update freeList
        if (foundBlockPrev = null) {
            let freeList = nextBlock;
        } else {
            let foundBlockPrev[NEXT] = nextBlock;
        }

        return block;
    }

    function Array bestFitPrev(int size) {
        var Array bestBlockPrev, currentBlock, prevBlock;
        var int bestSize, currentSize;

        let bestBlockPrev = NOT_FOUND; // if there is not bestBlock return NOT_FOUND
        let currentBlock = freeList;
        let prevBlock = null;
        let bestSize = heapBottom - heapBase;

        while (~(currentBlock = null)) {
            let currentSize = currentBlock[LENGTH] - 1; // available size
            if (~(currentSize < size) & (currentSize < bestSize)) {
                let bestBlockPrev = prevBlock;
                let bestSize = currentSize;
            }
            let prevBlock = currentBlock;
            let currentBlock = currentBlock[NEXT];
        }
        return bestBlockPrev;
    }

    /** De-allocates the given object (cast as an array) by making
     *  it available for future allocations. */
    function void deAlloc(Array object) {
        var int size;
        var Array segment, prevBlock, nextBlock;

        let size = object[ALLOC_SIZE];
        let segment = object - 1;
        let prevBlock = Memory.findPrevFree(segment);

        if (prevBlock = null) {
            let segment[LENGTH] = size;
            let segment[NEXT] = freeList;
            let freeList = segment;
        } else {
            if ((prevBlock + prevBlock[LENGTH]) = segment) { // check whether prevBlock and segment can be combined
                let prevBlock[LENGTH] = prevBlock[LENGTH] + size;
                let segment = prevBlock;
            } else {
                let segment[LENGTH] = size;
                let segment[NEXT] = prevBlock[NEXT];
                let prevBlock[NEXT] = segment;
            }
        }

        if (segment + segment[LENGTH] = segment[NEXT]) { // check whether segment and nextBlock can be combined
            let nextBlock = segment[NEXT];
            let segment[LENGTH] = segment[LENGTH] + nextBlock[LENGTH];
            let segment[NEXT] = nextBlock[NEXT];
        }
        return;
    }

    function Array findPrevFree(Array segment) {
        var Array block;

        if (freeList > segment) {
            return null;
        }

        let block = freeList;
        while (~(block[NEXT] = null) & (block[NEXT] < segment)) {
            let block = block[NEXT];
        }
        return block;
    }
}
`;

const Output = `
class Output {
    static Array charMaps;
    static Array screen;
    static int cursorX, cursorY;

    function void init() {
        let screen = 16384;
        let cursorX = 0;
        let cursorY = 0;

        do Output.initMap();
        return;
    }

    function void initMap() {
        var int i;

        let charMaps = Array.new(127);

        do Output.create(0,63,63,63,63,63,63,63,63,63,0,0);

        do Output.create(32,0,0,0,0,0,0,0,0,0,0,0);          //
        do Output.create(33,12,30,30,30,12,12,0,12,12,0,0);  // !
        do Output.create(34,54,54,20,0,0,0,0,0,0,0,0);       // "
        do Output.create(35,0,18,18,63,18,18,63,18,18,0,0);  // #
        do Output.create(36,12,30,51,3,30,48,51,30,12,12,0); // $
        do Output.create(37,0,0,35,51,24,12,6,51,49,0,0);    // %
        do Output.create(38,12,30,30,12,54,27,27,27,54,0,0); // &
        do Output.create(39,12,12,6,0,0,0,0,0,0,0,0);        // '
        do Output.create(40,24,12,6,6,6,6,6,12,24,0,0);      // (
        do Output.create(41,6,12,24,24,24,24,24,12,6,0,0);   // )
        do Output.create(42,0,0,0,51,30,63,30,51,0,0,0);     // *
        do Output.create(43,0,0,0,12,12,63,12,12,0,0,0);     // +
        do Output.create(44,0,0,0,0,0,0,0,12,12,6,0);        // ,
        do Output.create(45,0,0,0,0,0,63,0,0,0,0,0);         // -
        do Output.create(46,0,0,0,0,0,0,0,12,12,0,0);        // .
        do Output.create(47,0,0,32,48,24,12,6,3,1,0,0);      // /

        do Output.create(48,12,30,51,51,51,51,51,30,12,0,0); // 0
        do Output.create(49,12,14,15,12,12,12,12,12,63,0,0); // 1
        do Output.create(50,30,51,48,24,12,6,3,51,63,0,0);   // 2
        do Output.create(51,30,51,48,48,28,48,48,51,30,0,0); // 3
        do Output.create(52,16,24,28,26,25,63,24,24,60,0,0); // 4
        do Output.create(53,63,3,3,31,48,48,48,51,30,0,0);   // 5
        do Output.create(54,28,6,3,3,31,51,51,51,30,0,0);    // 6
        do Output.create(55,63,49,48,48,24,12,12,12,12,0,0); // 7
        do Output.create(56,30,51,51,51,30,51,51,51,30,0,0); // 8
        do Output.create(57,30,51,51,51,62,48,48,24,14,0,0); // 9

        do Output.create(58,0,0,12,12,0,0,12,12,0,0,0);      // :
        do Output.create(59,0,0,12,12,0,0,12,12,6,0,0);      // ;
        do Output.create(60,0,0,24,12,6,3,6,12,24,0,0);      // <
        do Output.create(61,0,0,0,63,0,0,63,0,0,0,0);        // =
        do Output.create(62,0,0,3,6,12,24,12,6,3,0,0);       // >
        do Output.create(64,30,51,51,59,59,59,27,3,30,0,0);  // @
        do Output.create(63,30,51,51,24,12,12,0,12,12,0,0);  // ?

        do Output.create(65,12,30,51,51,63,51,51,51,51,0,0); // A ** TO BE FILLED **
        do Output.create(66,31,51,51,51,31,51,51,51,31,0,0); // B
        do Output.create(67,28,54,35,3,3,3,35,54,28,0,0);    // C
        do Output.create(68,15,27,51,51,51,51,51,27,15,0,0); // D
        do Output.create(69,63,51,35,11,15,11,35,51,63,0,0); // E
        do Output.create(70,63,51,35,11,15,11,3,3,3,0,0);    // F
        do Output.create(71,28,54,35,3,59,51,51,54,44,0,0);  // G
        do Output.create(72,51,51,51,51,63,51,51,51,51,0,0); // H
        do Output.create(73,30,12,12,12,12,12,12,12,30,0,0); // I
        do Output.create(74,60,24,24,24,24,24,27,27,14,0,0); // J
        do Output.create(75,51,51,51,27,15,27,51,51,51,0,0); // K
        do Output.create(76,3,3,3,3,3,3,35,51,63,0,0);       // L
        do Output.create(77,33,51,63,63,51,51,51,51,51,0,0); // M
        do Output.create(78,51,51,55,55,63,59,59,51,51,0,0); // N
        do Output.create(79,30,51,51,51,51,51,51,51,30,0,0); // O
        do Output.create(80,31,51,51,51,31,3,3,3,3,0,0);     // P
        do Output.create(81,30,51,51,51,51,51,63,59,30,48,0);// Q
        do Output.create(82,31,51,51,51,31,27,51,51,51,0,0); // R
        do Output.create(83,30,51,51,6,28,48,51,51,30,0,0);  // S
        do Output.create(84,63,63,45,12,12,12,12,12,30,0,0); // T
        do Output.create(85,51,51,51,51,51,51,51,51,30,0,0); // U
        do Output.create(86,51,51,51,51,51,30,30,12,12,0,0); // V
        do Output.create(87,51,51,51,51,51,63,63,63,18,0,0); // W
        do Output.create(88,51,51,30,30,12,30,30,51,51,0,0); // X
        do Output.create(89,51,51,51,51,30,12,12,12,30,0,0); // Y
        do Output.create(90,63,51,49,24,12,6,35,51,63,0,0);  // Z

        do Output.create(91,30,6,6,6,6,6,6,6,30,0,0);          // [
        do Output.create(92,0,0,1,3,6,12,24,48,32,0,0);        // \
        do Output.create(93,30,24,24,24,24,24,24,24,30,0,0);   // ]
        do Output.create(94,8,28,54,0,0,0,0,0,0,0,0);          // ^
        do Output.create(95,0,0,0,0,0,0,0,0,0,63,0);           // _
        do Output.create(96,6,12,24,0,0,0,0,0,0,0,0);          // \`

        do Output.create(97,0,0,0,14,24,30,27,27,54,0,0);      // a
        do Output.create(98,3,3,3,15,27,51,51,51,30,0,0);      // b
        do Output.create(99,0,0,0,30,51,3,3,51,30,0,0);        // c
        do Output.create(100,48,48,48,60,54,51,51,51,30,0,0);  // d
        do Output.create(101,0,0,0,30,51,63,3,51,30,0,0);      // e
        do Output.create(102,28,54,38,6,15,6,6,6,15,0,0);      // f
        do Output.create(103,0,0,30,51,51,51,62,48,51,30,0);   // g
        do Output.create(104,3,3,3,27,55,51,51,51,51,0,0);     // h
        do Output.create(105,12,12,0,14,12,12,12,12,30,0,0);   // i
        do Output.create(106,48,48,0,56,48,48,48,48,51,30,0);  // j
        do Output.create(107,3,3,3,51,27,15,15,27,51,0,0);     // k
        do Output.create(108,14,12,12,12,12,12,12,12,30,0,0);  // l
        do Output.create(109,0,0,0,29,63,43,43,43,43,0,0);     // m
        do Output.create(110,0,0,0,29,51,51,51,51,51,0,0);     // n
        do Output.create(111,0,0,0,30,51,51,51,51,30,0,0);     // o
        do Output.create(112,0,0,0,30,51,51,51,31,3,3,0);      // p
        do Output.create(113,0,0,0,30,51,51,51,62,48,48,0);    // q
        do Output.create(114,0,0,0,29,55,51,3,3,7,0,0);        // r
        do Output.create(115,0,0,0,30,51,6,24,51,30,0,0);      // s
        do Output.create(116,4,6,6,15,6,6,6,54,28,0,0);        // t
        do Output.create(117,0,0,0,27,27,27,27,27,54,0,0);     // u
        do Output.create(118,0,0,0,51,51,51,51,30,12,0,0);     // v
        do Output.create(119,0,0,0,51,51,51,63,63,18,0,0);     // w
        do Output.create(120,0,0,0,51,30,12,12,30,51,0,0);     // x
        do Output.create(121,0,0,0,51,51,51,62,48,24,15,0);    // y
        do Output.create(122,0,0,0,63,27,12,6,51,63,0,0);      // z

        do Output.create(123,56,12,12,12,7,12,12,12,56,0,0);   // {
        do Output.create(124,12,12,12,12,12,12,12,12,12,0,0);  // |
        do Output.create(125,7,12,12,12,56,12,12,12,7,0,0);    // }
        do Output.create(126,38,45,25,0,0,0,0,0,0,0,0);        // ~

    	return;
    }

    function void create(int index, int a, int b, int c, int d, int e,
                         int f, int g, int h, int i, int j, int k) {
        var Array map;

        let map = Array.new(11);
        let charMaps[index] = map;

        let map[0] = a;
        let map[1] = b;
        let map[2] = c;
        let map[3] = d;
        let map[4] = e;
        let map[5] = f;
        let map[6] = g;
        let map[7] = h;
        let map[8] = i;
        let map[9] = j;
        let map[10] = k;

        return;
    }

    function Array getMap(char c) {
        if ((c < 32) | (c > 126)) {
            let c = 0;
        }
        return charMaps[c];
    }

    function void moveCursor(int i, int j) {
        let cursorX = j;
        let cursorY = i;
        return;
    }

    function void printChar(char c) {
        var Array map;
        var int address, bitmap, i;
        var boolean shouldDisplayRight;

        let map = Output.getMap(c);
        let address = (cursorY * 32 * 11) + (cursorX * 8 / 16);
        let shouldDisplayRight = ((cursorX & 1) = 1);

        let i = 0;
        while (i < 11) {
            let bitmap = map[i];
            if (shouldDisplayRight) {
                let bitmap = bitmap * 256;
                let screen[address] = screen[address] & (-1 & 255) | bitmap; // reset right side and set bitmap
            } else {
                let screen[address] = screen[address] & 255 | bitmap; // reset left side and set bitmap
            }
            let address = address + 32;
            let i = i + 1;
        }

        // advance the cursor
        if (cursorX = 63) {
            do Output.println();
        } else {
            let cursorX = cursorX + 1;
        }
        return;
    }

    function void printString(String s) {
        var int i;
        let i = 0;

        while (i < s.length()) {
            do Output.printChar(s.charAt(i));
            let i = i + 1;
        }
        return;
    }

    function void printInt(int i) {
        var String s;
        let s = String.new(6);
        do s.setInt(i);
        do Output.printString(s);
        do s.dispose();
        return;
    }

    function void println() {
        if (cursorY < 22) {
            do Output.moveCursor(cursorY + 1, 0);
        } else {
            do Output.moveCursor(0, 0);
        }
        return;
    }

    function void backSpace() {
        if (cursorX = 0) {
            if (~(cursorY = 0)) {
                do Output.moveCursor(cursorY - 1, 63);
            }
        } else {
            do Output.moveCursor(cursorY, cursorX - 1);
        }
        return;
    }
}
`;

const Screen = `
class Screen {
    static Array screen;
    static boolean color;

    function void init() {
        let screen = 16384;
        let color = true;
        return;
    }

    function void clearScreen() {
        var int i;
        let i = 0;
        while (i < 8192) {
            let screen[i] = false;
            let i = i + 1;
        }
        return;
    }

    function void setColor(boolean b) {
        let color = b;
        return;
    }

    function void drawPixel(int x, int y) {
        var int address, target;
        let address = (y * 32) + (x / 16);
        let target = Math.twoToThe(x & 15); // 'x & 15' means 'x mod 16'

        if (color) {
            let screen[address] = screen[address] | target; // black
        } else {
            let screen[address] = screen[address] & ~target; // white
        }
        return;
    }

    function void drawLine(int x1, int y1, int x2, int y2) {
        var int dx, dy;
        var int temp;

        if (x1 > x2) {
            let temp = x1;
            let x1 = x2;
            let x2 = temp;
            let temp = y1;
            let y1 = y2;
            let y2 = temp;
        }

        let dx = x2 - x1;
        let dy = y2 - y1;

        if (dx = 0) {
            do Screen.drawVerticalLine(x1, y1, y2);
            return;
        }

        if (dy = 0) {
            do Screen.drawHorizontalLine(x1, x2, y1);
            return;
        }

        do Screen.drawDiagonalLine(x1, x2, y1, y2, dx, dy);
        return;
    }

    function void drawDiagonalLine(int x1, int x2, int y1, int y2, int dx, int dy) {
        var int a, b, adyMinusbdx, yIncrement;

        let a = 0;
        let b = 0;
        let adyMinusbdx = 0;
        if (dy < 0) {
            let yIncrement = -1;
        } else {
            let yIncrement = 1;
        }

        while (~(a > dx) & (((yIncrement = 1) & ~(b > dy)) | ((yIncrement = -1) & ~(b < dy)))) {
            do Screen.drawPixel(x1 + a, y1 + b);
            if (adyMinusbdx < 0) {
                let a = a + 1;
                let adyMinusbdx = adyMinusbdx + (dy * yIncrement);
            } else {
                let b = b + yIncrement;
                let adyMinusbdx = adyMinusbdx - dx;
            }
        }
        return;
    }

    function void drawVerticalLine(int x, int y1, int y2) {
        var int temp;

        if (y1 > y2) {
            let temp = y1;
            let y1 = y2;
            let y2 = temp;
        }

        while (~(y1 > y2)) {
            do Screen.drawPixel(x, y1);
            let y1 = y1 + 1;
        }
        return;
    }

    function void drawHorizontalLine(int x1, int x2, int y) {
        var int temp;

        if (x1 > x2) {
            let temp = x1;
            let x1 = x2;
            let x2 = temp;
        }

        while (~(x1 > x2)) {
            do Screen.drawPixel(x1, y);
            let x1 = x1 + 1;
        }
        return;
    }

    function void drawRectangle(int x1, int y1, int x2, int y2) {
        while (~(y1 > y2)) {
            do Screen.drawHorizontalLine(x1, x2, y1);
            let y1 = y1 + 1;
        }
        return;
    }

    function void drawCircle(int x, int y, int r) {
        var int dx, dy;

        let dy = -r;
        while (~(dy > r)) {
            let dx = Math.sqrt((r * r) - (dy * dy));
            do Screen.drawHorizontalLine(x - dx, x + dx, y + dy);
            let dy = dy + 1;
        }
        return;
    }
}
`;

const String = `
class String {
    field Array chars;
    field int currentLen, maxLen;

    constructor String new(int maxLength) {
        if (maxLength = 0) {
            let maxLength = 1;
        }
        let chars = Array.new(maxLength);
        let currentLen = 0;
        let maxLen = maxLength;
        return this;
    }

    method void dispose() {
        do chars.dispose();
        return;
    }

    method int length() {
        return currentLen;
    }

    method char charAt(int j) {
        return chars[j];
    }

    method void setCharAt(int j, char c) {
        let chars[j] = c;
        return;
    }

    method String appendChar(char c) {
        if (currentLen < maxLen) {
            let chars[currentLen] = c;
            let currentLen = currentLen + 1;
        }
        return this;
    }

    method void eraseLastChar() {
        if (currentLen > 0) {
            let currentLen = currentLen - 1;
        }
        return;
    }

    method int intValue() {
        var int index, intVal;
        var boolean pos;
        let intVal = 0;

        if ((currentLen > 0) & (chars[0] = 45)) { // check minus sign
            let pos = false;
            let index = 1;
        } else {
            let pos = true;
            let index = 0;
        }

        while ((index < currentLen) & String.isDigit(chars[index])) {
            let intVal = (intVal * 10) + chars[index] - 48;
            let index = index + 1;
        }

        if (pos) {
            return intVal;
        } else {
            return -intVal;
        }

    }

    function boolean isDigit(char c) {
        return ~(c < 48) & ~(c > 57);
    }

    method void setInt(int val) {
        let currentLen = 0; // reset

        if (val < 0) {
            let val = -val;
            do appendChar(45);
        }

        do setPositiveInt(val);
        return;
    }

    method void setPositiveInt(int val) {
        var int nextVal;

        if (val < 10) {
            do appendChar(val + 48);
        } else {
            let nextVal = val / 10;
            do setPositiveInt(nextVal);
            do appendChar((val - (nextVal * 10)) + 48);
        }
        return;
    }

    function char newLine() {
        return 128;
    }

    function char backSpace() {
        return 129;
    }

    function char doubleQuote() {
        return 34;
    }
}
`;

const Keyboard = `
class Keyboard {
    static Array keyboard;

    function void init() {
        let keyboard = 24576;
        return;
    }

    function char keyPressed() {
        return keyboard[0];
    }

    function char readChar() {
        var char c;
        while (Keyboard.keyPressed() = 0) {}
        let c = keyboard[0];
        while (Keyboard.keyPressed() = c) {}
        do Output.printChar(c);
        return c;
    }

    function String readLine(String message) {
        var String s;
        var char c;

        do Output.printString(message);
        let s = String.new(50); // arbitrary max length
        let c = Keyboard.readChar();

        while (~(c = String.newLine())) {
            if (c = String.backSpace()) {
                do s.eraseLastChar();
            } else {
                do s.appendChar(c);
            }
            let c = Keyboard.readChar();
        }
        return s;
    }

    function int readInt(String message) {
        var String s;
        let s = Keyboard.readLine(message);
        return s.intValue();
    }
}
`;

export const OS = {
  Sys,
  Math,
  Array,
  Memory,
  Output,
  Screen,
  String,
  Keyboard,
};
