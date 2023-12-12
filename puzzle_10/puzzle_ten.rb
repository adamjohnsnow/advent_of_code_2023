def find_start(map)
  map.each_with_index do |line, index|
    if line.include?("S")
      return index,line.index("S")
    end
  end
end


file_lines = File.readlines('input.txt', chomp: true)

@split_lines = []
file_lines.each {|line| @split_lines << line.split('')}

y,x = find_start(@split_lines)

@steps = 0
def start_options(y,x)
  return "N" unless  @split_lines[y-1][x] == "." || @split_lines[y-1][x] == "L" || @split_lines[y-1][x] == "J"
  return "E" unless  @split_lines[y][x +1] == "." || @split_lines[y][x+1] == "L" || @split_lines[y][x+1] == "F"
  return "S" unless  @split_lines[y+1][x] == "." || @split_lines[y+1][x] == "7" || @split_lines[y+1][x] == "F"
  return "W"  
end

def step(y,x,d)
  @steps += 1
  case d
  when "N"
    return y - 1, x,@split_lines[y-1][x]
  when "E"
    return y, x + 1,@split_lines[y][x+1]
  when "S"
    return y + 1 ,x, @split_lines[y+1][x]
  end
  return y, x - 1, @split_lines[y][x-1]
end

def next_direction(letter, direction)
  case direction
  when "N"
    case letter
    when "7"
      return "W"
    when "F"
      return "E"
    else
      return direction
    end
  when "E"
    case letter
    when "J"
      return "N"
    when "7"
      return "S"
    else
      return direction
    end
  when "S"
    case letter
    when "L"
      return "E"
    when "J"
      return "W"
    else
      return direction
    end
  when "W"
    case letter
    when "L"
      return "N"
    when "F"
      return "S"
    else
      return direction
    end

  end
  
end

direction = start_options(y,x)
y,x,letter = step(y,x,direction)
p "#{y},#{x},#{letter}, #{direction}"

while letter != "S" do
  case letter
  when "|"
    @split_lines[y][x] = "!"
  when "-"
    @split_lines[y][x] = "="
  when "7"
    @split_lines[y][x] = "¶"
  else
    @split_lines[y][x] = letter.downcase
  end

  direction = next_direction(letter, direction)
  y,x,letter = step(y,x,direction)

  p "#{y},#{x},#{letter}, #{direction}"
end


inside_count = 0
@split_lines.each do |line|
  index = 0
  inside = false
  pending_turn = ""
  while index < line.length
    char = line[index]
    if [".","F","L","7","J","|","-"].include?(char) && inside
      line[index] = "I"
      inside_count +=1
    end
    pending_turn = char if char == "l" || char == "f" || char == "S"
    if char == "!" ||
      (char == "j" && (pending_turn == "f" || pending_turn == "S")) ||
      (char == "¶" && (pending_turn == "l" || pending_turn == "S"))
      inside = !inside 
    end
    index += 1
  end
  p line.join('')
end



p "STEPS #{@steps/2}"



p inside_count
