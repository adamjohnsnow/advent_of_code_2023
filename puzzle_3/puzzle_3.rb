@file = File.readlines('./puzzle_input_3_test.txt', chomp: true)

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

def check_gear(index_y, index_x)
  p index_y, index_x
  p @file.fetch(index_y - 1, '')[index_x - 3..index_x + 3]
end

sum = 0

@file.each_with_index do |line, index|
  line << ['...']
  results = parse_symbols(line)
  results.each do |result|
    check_gear(index, result[:index])
  end

  results = parse_line(line)
  results.each do |result|
    sum += result[:number].to_i if check_part(index, result[:index], result[:number].length)
  end
end

p sum