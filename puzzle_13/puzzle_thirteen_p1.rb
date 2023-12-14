@count = 0
@direction = ""
@pattern = []
@matches = false

def loop_pattern
  p @direction, @pattern
  (0..@pattern.length-2).each do |i|
    if @pattern[i] == @pattern[i+1] 
      a =i
      b = i+1
      @matches = true
      while a > 0 && b < @pattern.length - 1 && @matches == true
        a -= 1
        b += 1
          @matches = @pattern[a] == @pattern[b]
      end
      if @matches
        @count += (i + 1) * (@direction == "row" ? 100 : 1)
        p "the mirror #{@direction} is #{i+1} and #{i+2} #{@count} "

      end
    end
    return if @matches
  end
end

def find_reflection
  @matches = false
  @direction = "row"
  loop_pattern
  return if @matches
  @direction = "col"
  @pattern = @pattern.map(&:chars).transpose.map(&:join)
  loop_pattern
end

file_lines = File.readlines('test.txt', chomp: true)
result = file_lines.chunk { |x| x == "" }.reject { |condition, group| condition }.map(&:last)

# result.each do |pattern|
#   p "--------"
  @pattern = result[2]
  find_reflection
# end

p @count