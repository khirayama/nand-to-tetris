import assert from 'power-assert';
import { jackCompiler } from './';

const averageJackCode = `
class Main {
   function void main() {
     var Array a; 
     var int length;
     var int i, sum;

     let length = Keyboard.readInt("How many numbers? ");
     let a = Array.new(length); // constructs the array
     
     let i = 0;
     while (i < length) {
        let a[i] = Keyboard.readInt("Enter a number: ");
        let sum = sum + a[i];
        let i = i + 1;
     }
     
     do Output.printString("The average is ");
     do Output.printInt(sum / length);
     return;
   }
}
`;

const averageVM = `function Main.main 4
push constant 18
call String.new 1
push constant 72
call String.appendChar 2
push constant 111
call String.appendChar 2
push constant 119
call String.appendChar 2
push constant 32
call String.appendChar 2
push constant 109
call String.appendChar 2
push constant 97
call String.appendChar 2
push constant 110
call String.appendChar 2
push constant 121
call String.appendChar 2
push constant 32
call String.appendChar 2
push constant 110
call String.appendChar 2
push constant 117
call String.appendChar 2
push constant 109
call String.appendChar 2
push constant 98
call String.appendChar 2
push constant 101
call String.appendChar 2
push constant 114
call String.appendChar 2
push constant 115
call String.appendChar 2
push constant 63
call String.appendChar 2
push constant 32
call String.appendChar 2
call Keyboard.readInt 1
pop local 1
push local 1
call Array.new 1
pop local 0
push constant 0
pop local 2
label WHILE_LOOP_0
push local 2
push local 1
lt
not
if-goto WHILE_END_0
push local 2
push local 0
add
push constant 16
call String.new 1
push constant 69
call String.appendChar 2
push constant 110
call String.appendChar 2
push constant 116
call String.appendChar 2
push constant 101
call String.appendChar 2
push constant 114
call String.appendChar 2
push constant 32
call String.appendChar 2
push constant 97
call String.appendChar 2
push constant 32
call String.appendChar 2
push constant 110
call String.appendChar 2
push constant 117
call String.appendChar 2
push constant 109
call String.appendChar 2
push constant 98
call String.appendChar 2
push constant 101
call String.appendChar 2
push constant 114
call String.appendChar 2
push constant 58
call String.appendChar 2
push constant 32
call String.appendChar 2
call Keyboard.readInt 1
pop temp 0
pop pointer 1
push temp 0
pop that 0
push local 3
push local 0
push local 2
add
pop pointer 1
push that 0
add
pop local 3
push local 2
push constant 1
add
pop local 2
goto WHILE_LOOP_0
label WHILE_END_0
push constant 15
call String.new 1
push constant 84
call String.appendChar 2
push constant 104
call String.appendChar 2
push constant 101
call String.appendChar 2
push constant 32
call String.appendChar 2
push constant 97
call String.appendChar 2
push constant 118
call String.appendChar 2
push constant 101
call String.appendChar 2
push constant 114
call String.appendChar 2
push constant 97
call String.appendChar 2
push constant 103
call String.appendChar 2
push constant 101
call String.appendChar 2
push constant 32
call String.appendChar 2
push constant 105
call String.appendChar 2
push constant 115
call String.appendChar 2
push constant 32
call String.appendChar 2
call Output.printString 1
pop temp 0
push local 3
push local 1
call Math.divide 2
call Output.printInt 1
pop temp 0
push constant 0
return
`;

const averageXML = `<class>
  <keyword> class </keyword>
  <identifier> Main </identifier>
  <symbol> { </symbol>
  <subroutineDec>
    <keyword> function </keyword>
    <keyword> void </keyword>
    <identifier> main </identifier>
    <symbol> ( </symbol>
    <parameterList>
    </parameterList>
    <symbol> ) </symbol>
    <subroutineBody>
      <symbol> { </symbol>
      <varDec>
        <keyword> var </keyword>
        <identifier> Array </identifier>
        <identifier> a </identifier> isDefined: true, type: Array, kind: var, index: 0
        <symbol> ; </symbol>
      </varDec>
      <varDec>
        <keyword> var </keyword>
        <keyword> int </keyword>
        <identifier> length </identifier> isDefined: true, type: int, kind: var, index: 1
        <symbol> ; </symbol>
      </varDec>
      <varDec>
        <keyword> var </keyword>
        <keyword> int </keyword>
        <identifier> i </identifier> isDefined: true, type: int, kind: var, index: 2
        <symbol> , </symbol>
        <identifier> sum </identifier> isDefined: true, type: int, kind: var, index: 3
        <symbol> ; </symbol>
      </varDec>
      <statements>
        <letStatement>
          <keyword> let </keyword>
          <identifier> length </identifier> isDefined: false, type: int, kind: var, index: 1
          <symbol> = </symbol>
          <expression>
            <term>
              <identifier> Keyboard </identifier>
              <symbol> . </symbol>
              <identifier> readInt </identifier>
              <symbol> ( </symbol>
              <expressionList>
                <expression>
                  <term>
                    <stringConstant> How many numbers?  </stringConstant>
                  </term>
                </expression>
              </expressionList>
              <symbol> ) </symbol>
            </term>
          </expression>
          <symbol> ; </symbol>
        </letStatement>
        <letStatement>
          <keyword> let </keyword>
          <identifier> a </identifier> isDefined: false, type: Array, kind: var, index: 0
          <symbol> = </symbol>
          <expression>
            <term>
              <identifier> Array </identifier>
              <symbol> . </symbol>
              <identifier> new </identifier>
              <symbol> ( </symbol>
              <expressionList>
                <expression>
                  <term>
                    <identifier> length </identifier> isDefined: false, type: int, kind: var, index: 1
                  </term>
                </expression>
              </expressionList>
              <symbol> ) </symbol>
            </term>
          </expression>
          <symbol> ; </symbol>
        </letStatement>
        <letStatement>
          <keyword> let </keyword>
          <identifier> i </identifier> isDefined: false, type: int, kind: var, index: 2
          <symbol> = </symbol>
          <expression>
            <term>
              <integerConstant> 0 </integerConstant>
            </term>
          </expression>
          <symbol> ; </symbol>
        </letStatement>
        <whileStatement>
          <keyword> while </keyword>
          <symbol> ( </symbol>
          <expression>
            <term>
              <identifier> i </identifier> isDefined: false, type: int, kind: var, index: 2
            </term>
            <symbol> &lt; </symbol>
            <term>
              <identifier> length </identifier> isDefined: false, type: int, kind: var, index: 1
            </term>
          </expression>
          <symbol> ) </symbol>
          <symbol> { </symbol>
          <statements>
            <letStatement>
              <keyword> let </keyword>
              <identifier> a </identifier> isDefined: false, type: Array, kind: var, index: 0
              <symbol> [ </symbol>
              <expression>
                <term>
                  <identifier> i </identifier> isDefined: false, type: int, kind: var, index: 2
                </term>
              </expression>
              <symbol> ] </symbol>
              <symbol> = </symbol>
              <expression>
                <term>
                  <identifier> Keyboard </identifier>
                  <symbol> . </symbol>
                  <identifier> readInt </identifier>
                  <symbol> ( </symbol>
                  <expressionList>
                    <expression>
                      <term>
                        <stringConstant> Enter a number:  </stringConstant>
                      </term>
                    </expression>
                  </expressionList>
                  <symbol> ) </symbol>
                </term>
              </expression>
              <symbol> ; </symbol>
            </letStatement>
            <letStatement>
              <keyword> let </keyword>
              <identifier> sum </identifier> isDefined: false, type: int, kind: var, index: 3
              <symbol> = </symbol>
              <expression>
                <term>
                  <identifier> sum </identifier> isDefined: false, type: int, kind: var, index: 3
                </term>
                <symbol> + </symbol>
                <term>
                  <identifier> a </identifier> isDefined: false, type: Array, kind: var, index: 0
                  <symbol> [ </symbol>
                  <expression>
                    <term>
                      <identifier> i </identifier> isDefined: false, type: int, kind: var, index: 2
                    </term>
                  </expression>
                  <symbol> ] </symbol>
                </term>
              </expression>
              <symbol> ; </symbol>
            </letStatement>
            <letStatement>
              <keyword> let </keyword>
              <identifier> i </identifier> isDefined: false, type: int, kind: var, index: 2
              <symbol> = </symbol>
              <expression>
                <term>
                  <identifier> i </identifier> isDefined: false, type: int, kind: var, index: 2
                </term>
                <symbol> + </symbol>
                <term>
                  <integerConstant> 1 </integerConstant>
                </term>
              </expression>
              <symbol> ; </symbol>
            </letStatement>
          </statements>
          <symbol> } </symbol>
        </whileStatement>
        <doStatement>
          <keyword> do </keyword>
          <identifier> Output </identifier>
          <symbol> . </symbol>
          <identifier> printString </identifier>
          <symbol> ( </symbol>
          <expressionList>
            <expression>
              <term>
                <stringConstant> The average is  </stringConstant>
              </term>
            </expression>
          </expressionList>
          <symbol> ) </symbol>
          <symbol> ; </symbol>
        </doStatement>
        <doStatement>
          <keyword> do </keyword>
          <identifier> Output </identifier>
          <symbol> . </symbol>
          <identifier> printInt </identifier>
          <symbol> ( </symbol>
          <expressionList>
            <expression>
              <term>
                <identifier> sum </identifier> isDefined: false, type: int, kind: var, index: 3
              </term>
              <symbol> / </symbol>
              <term>
                <identifier> length </identifier> isDefined: false, type: int, kind: var, index: 1
              </term>
            </expression>
          </expressionList>
          <symbol> ) </symbol>
          <symbol> ; </symbol>
        </doStatement>
        <returnStatement>
          <keyword> return </keyword>
          <symbol> ; </symbol>
        </returnStatement>
      </statements>
      <symbol> } </symbol>
    </subroutineBody>
  </subroutineDec>
  <symbol> } </symbol>
</class>
`;

describe('jackCompiler', function () {
  it('Work jackCompiler correctly with Average', function () {
    const code = {
      Main: averageJackCode,
    };

    const result = jackCompiler(code);
    assert.equal(result.Main.vm, averageVM);
    assert.equal(result.Main.xml, averageXML);
    assert.deepEqual(result, {
      Main: {
        vm: averageVM,
        xml: averageXML,
      },
    });
  });
});
