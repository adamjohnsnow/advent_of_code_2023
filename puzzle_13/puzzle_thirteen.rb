@count = 0
@cleaned_count = 0
@matches =false
@found = false

def loop_pattern(pattern, previous)
  (0..pattern.length-2).each do |i|
    if pattern[i] == pattern[i+1] && i + 1 != previous
      a =i
      b = i+1
      @matches = true
      while a > 0 && b < pattern.length - 1 && @matches == true
        a -= 1
        b += 1
        @matches = pattern[a] == pattern[b]
      end
      if @matches
        p "the mirror at #{i+1} #{@direction} is #{pattern[i]} and #{pattern[i+1]} "
       return i+1
        
      end
    end
  end
  nil
end

def fix_smudges(pattern)
  smudge = false

  (0..pattern.length-2).each do |i|
    a = i
    b = i + 1
    smudge = false

    while a >= 0 && b < pattern.length && smudge == false
      count = 0
      (0..pattern[a].length).each do |x|
        count += 1 if pattern[a][x] != pattern[b][x]
      end

      if count == 1
        smudge = true
        break
      elsif count == 0
        a -= 1
        b += 1
      else
        break
      end

    end
    if smudge
      pattern[a] = pattern[b] 
      return pattern
    end
    break if smudge
  end
  pattern
end

def find_reflection
  @direction = "row"
  row_result = loop_pattern(@pattern[:original_rows], "x") 
  if row_result
    @pattern[:original_mirror] = row_result
    @count += row_result * 100

  else
    @direction = "col"
    col_result = loop_pattern(@pattern[:original_cols], "x")
    @pattern[:original_mirror] = col_result
    @count += col_result
  end
  
  p @count

  @direction = "row"
  row_result = loop_pattern(@pattern[:cleaned_rows], @pattern[:original_mirror]) 
  if row_result
    @pattern[:cleaned_mirror] = row_result * 100
  else
    @direction = "col"
    col_result = loop_pattern(@pattern[:cleaned_cols], @pattern[:original_mirror])
    @pattern[:cleaned_mirror] = col_result
  end
  
  @cleaned_count += @pattern[:cleaned_mirror].to_i
  p @cleaned_count
end

file_lines = File.readlines('input.txt', chomp: true)
result = file_lines.chunk { |x| x == "" }.reject { |condition, group| condition }.map(&:last)

result.each_with_index do |pattern, index|
 @pattern = {
  original_rows: pattern.dup,
  original_cols: pattern.dup.map(&:chars).transpose.map(&:join),
  original_mirror: nil,
  cleaned_rows: fix_smudges(pattern.dup),
  cleaned_cols: fix_smudges(pattern.map(&:chars).transpose.map(&:join)),
  cleaned_mirror: nil
 }
 find_reflection
end

p "--#{@count}"
p "---#{@cleaned_count}"