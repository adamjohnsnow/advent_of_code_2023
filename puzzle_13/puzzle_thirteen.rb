@count = 0
@direction = ""
@pattern = []

def loop_pattern
  p @pattern
  (0..@pattern.length-1).each do |i|
    if @pattern[i] == @pattern[i+1]
      a =i
      b = i+1
      matches = true
      while a > 0 && b < @pattern.length - 1 && matches == true
        a -= 1
        b += 1
        matches = @pattern[a] == @pattern[b]
      end
      if matches
        p "the mirror #{@direction} is #{i+1} and #{i+2} "
        @count += (i + 1) * (@direction == "row" ? 100 : 1)
      end
    end
  end
end

def find_reflection
  matches = false
  @direction = "row"
  loop_pattern
  @direction = "col"
  @pattern = @pattern.map(&:chars).transpose.map(&:join)
  loop_pattern
end

file_lines = File.readlines('input.txt', chomp: true)
result = file_lines.chunk { |x| x == "" }.reject { |condition, group| condition }.map(&:last)

# find_reflection(result[2])
result.each do |pattern|
  @pattern = pattern
  find_reflection
end

p @count