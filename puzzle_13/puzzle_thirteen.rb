@count = 0
@cleaned_count = 0
@matches =false
@found = false

def loop_pattern(pattern, previous)
  (0..pattern.length - 2).each do |i|
    next unless pattern[i] == pattern[i + 1] && i + 1 != previous

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
      count = pattern[a].each_char.zip(pattern[b].each_char).count { |x, y| x != y }

      if count == 1
        smudge = true
        pattern[a] = pattern[b]
        break
      elsif count.zero?
        a -= 1
        b += 1
      else
        break
      end
    end

    break if smudge
  end
  pattern
end

def find_reflection
  @direction = "row"
  row_result = loop_pattern(@pattern[:original_rows], "x")
  @pattern[:original_mirror] = row_result if row_result
  @count += row_result * 100 if row_result

  @direction = "col"
  col_result = loop_pattern(@pattern[:original_cols], "x")
  @pattern[:original_mirror] = col_result if col_result
  @count += col_result if col_result

  @direction = "row"
  row_result = loop_pattern(@pattern[:cleaned_rows], @pattern[:original_mirror])
  @pattern[:cleaned_mirror] = row_result * 100 if row_result
  @cleaned_count += @pattern[:cleaned_mirror].to_i if row_result

  @direction = "col"
  col_result = loop_pattern(@pattern[:cleaned_cols], @pattern[:original_mirror])
  @pattern[:cleaned_mirror] = col_result if col_result
  @cleaned_count += col_result if col_result

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

p "pt1 #{@count}"
p "pt2 #{@cleaned_count}"