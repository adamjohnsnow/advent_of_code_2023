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
  return "N" unless  @split_lines[y-1][x] == "."
  return "E" unless  @split_lines[y][x +1] == "."
  return "S" unless  @split_lines[y+1][x] == "."
  return "W"  
end

def step(y,x,d)
  @steps += 1
  case d
  when "N"
    return y-1, x,@split_lines[y-1][x]
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
  direction = next_direction(letter, direction)
  y,x,letter = step(y,x,direction)

  p "#{y},#{x},#{letter}, #{direction}"
end

p @steps/2