@count = 0
@cleaned_count = 0
@matches =false
@found = false

def loop_pattern(pattern, previous)
  (0..pattern.length - 2).each do |i|
    next unless pattern[i] == pattern[i + 1] && "#{@direction} #{i +1}" != "#{previous}"

    a = i
    b = i + 1
    @matches = true

    while a.positive? && b < pattern.length - 1 && @matches
      a -= 1
      b += 1
      @matches = pattern[a] == pattern[b]
    end

    return i + 1 if @matches
  end
  nil
end

def fix_smudges(pattern)
  (0..pattern.length - 2).each do |i|
    a = i
    b = i + 1
    smudge = false

    while a >= 0 && b < pattern.length && !smudge
      count = 0
      (0..pattern[a].length).each do |x|
        count += 1 if pattern[a][x] != pattern[b][x]
      end

      if count == 1
        aa = a-1
        bb = b+1
        same = true
        while aa >= 0 && bb < pattern[0].length && same
          aa -=1
          bb +=1
          same = pattern[aa] == pattern[bb]
        end
        if same
          smudge = true
          pattern[a] = pattern[b]
          return pattern
        end
      end
    end

    return pattern if smudge
  end
  pattern
end

def find_reflection
  @direction = "row"
  row_result = loop_pattern(@pattern[:original_rows], "x")
  @pattern[:original_mirror] = "row #{row_result}" if row_result
  @count += row_result * 100 if row_result

  @direction = "col"
  col_result = loop_pattern(@pattern[:original_cols], "x")
  @pattern[:original_mirror] = "col #{col_result}" if col_result
  @count += col_result if col_result

  @direction = "row"
  row_result = loop_pattern(@pattern[:cleaned_rows], @pattern[:original_mirror])
  @pattern[:cleaned_mirror] = "row #{row_result}"if row_result
  @cleaned_count += row_result * 100 if row_result

  @direction = "col"
  col_result = loop_pattern(@pattern[:cleaned_cols], @pattern[:original_mirror])
  @pattern[:cleaned_mirror] = "col #{col_result}" if col_result
  @cleaned_count += col_result if col_result

  p "#{@pattern[:index]} orig: #{@pattern[:original_mirror]} clean: #{@pattern[:cleaned_mirror]}"
  p @pattern[:original_rows], @pattern[:cleaned_rows]
end

file_lines = File.readlines('test.txt', chomp: true)
result = file_lines.chunk { |x| x == "" }.reject { |condition, group| condition }.map(&:last)

result.each_with_index do |pattern, index|
  # if index == 0
    @pattern = {
      index: index,
      original_rows: pattern.dup,
      original_cols: pattern.dup.map(&:chars).transpose.map(&:join),
      original_mirror: nil,
      cleaned_rows: fix_smudges(pattern.dup),
      cleaned_cols: fix_smudges(pattern.map(&:chars).transpose.map(&:join)),
      cleaned_mirror: nil
    }
    find_reflection
  # end
end

p "pt1 #{@count}"
p "pt2 #{@cleaned_count}"