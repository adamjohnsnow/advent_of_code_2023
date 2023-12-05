@file = File.readlines('./puzzle_input_3.txt', chomp: true)

def is_digit(character)
  ('0'..'9').include?(character)
end

def parse_line(line)
  numbers = []
  line.scan(/\d+/) do |match|
    numbers << { number: match, index: Regexp.last_match.begin(0) }
  end
  
  numbers
end

def parse_symbols(line)
  symbols = []
  line.scan(/[^.a-zA-Z0-9\s]/) do |match|
    symbols << { symbol: match, index: Regexp.last_match.begin(0) }
  end
  
  symbols
end

def get_neighbours(index_y, index_x, length)
  neighbours = []
  left_edge = index_x == 0 ? 0 : index_x -1
  
  neighbours << @file[index_y - 1][left_edge .. index_x + length] if index_y > 0
  neighbours << @file[index_y][index_x - 1] if index_x > 0
  neighbours << @file[index_y][index_x + length] if index_x + length < @file[index_y].length
  neighbours << @file[index_y + 1][left_edge .. index_x + length] if @file.length > index_y + 1

  neighbours
end

def check_part(index_y, index_x, length)
  neighbours = get_neighbours(index_y, index_x, length)
  !!neighbours.join()[/[^.a-zA-Z0-9\s]/]
end

def number_finder(row, index_y, index_x)
  number = []

  if is_digit(row[1])
    number << row[1]
    prev_num = @file[index_y][index_x - 1]
    number.unshift(prev_num) if is_digit(prev_num)
    next_num = @file[index_y][index_x + 1]
    number.push(next_num) if is_digit(next_num)
    if is_digit(prev_num) && !is_digit(next_num)
      number.unshift(@file[index_y][index_x - 2]) if is_digit(@file[index_y][index_x - 2])
    end
    if !is_digit(prev_num) && is_digit(next_num)
      number.push(@file[index_y][index_x + 2]) if is_digit(@file[index_y][index_x + 2])
    end
  end

  return [number.join('').to_i] if number.length > 0

  found = []

  if is_digit(row[0])
    number = [row[0]]
    next_num = @file[index_y][index_x - 2]
    if is_digit(next_num)
      number.unshift(next_num)
      next_num = @file[index_y][index_x - 3]
      number.unshift(next_num)if is_digit(next_num)
    end
    found << number.join('').to_i
  end

  if is_digit(row[2])
    number = [row[2]]
    next_num = @file[index_y][index_x + 2]
    if is_digit(next_num)
      number.push(next_num)
      next_num = @file[index_y][index_x + 3]
      number.push(next_num)if is_digit(next_num)
    end
    found << number.join('').to_i
  end
  found
end

def check_gear(index_y, index_x)
  numbers = []
  above = [@file[index_y -1][index_x-1],@file[index_y -1][index_x], @file[index_y -1][index_x+1]]
  below = [@file[index_y +1][index_x-1],@file[index_y +1][index_x], @file[index_y +1][index_x+1]]

  unless above.join('') == "..." 
    numbers.concat(number_finder(above, index_y-1, index_x))
  end

  unless below.join('') == "..."
    numbers.concat(number_finder(below, index_y + 1, index_x))
  end

  if is_digit(@file[index_y][index_x - 1])
    number = [@file[index_y][index_x - 1]]
    next_num = @file[index_y][index_x - 2]
    if is_digit(next_num)
      number.unshift(next_num)
      next_num = @file[index_y][index_x - 3]
      number.unshift(next_num)if is_digit(next_num)
      numbers << number.join('').to_i
    end
  end

  if is_digit(@file[index_y][index_x + 1])
    number = [@file[index_y][index_x + 1]]
    next_num = @file[index_y][index_x + 2]
    if is_digit(next_num)
      number.push(next_num)
      next_num = @file[index_y][index_x + 3]
      number.push(next_num)if is_digit(next_num)
      numbers << number.join('').to_i
    end
  end
  ratio = numbers.length > 1 ? numbers[0] * numbers[1] : 0
  p "#{numbers} = #{ratio} at #{index_y}, #{index_x}" if numbers.length > 1
  ratio
end

sum = 0
gears = 0

@file.each_with_index do |line, index|
  results = parse_symbols(line)
  results.each do |result|
    gears += check_gear(index, result[:index])
  end

  results = parse_line(line)
  results.each do |result|
    sum += result[:number].to_i if check_part(index, result[:index], result[:number].length)
  end
end

p sum
p gears